import React, { Component } from 'react';
import {
  Dropdown,
  Form,
  Container,
  Message,
  Button,
  Icon,
  Header,
  TextArea
} from 'semantic-ui-react';
import { DateTimeInput } from 'semantic-ui-calendar-react';
import 'moment/locale/tr';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FieldHelperText from './FieldHelperText';
import moment from 'moment';

const AppointmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Adınız en az 3 karakterden oluşmalıdır.')
    .max(50, 'Adınız en fazla 50 karakter olabilir.')
    .required('Lütfen adınızı giriniz.'),
  surname: Yup.string()
    .min(3, 'Soyadınız en az 3 karakterden oluşmalıdır.')
    .max(50, 'Soyadınız en fazla 50 karakter olabilir.')
    .required('Lütfen soyadınızı giriniz.'),
  email: Yup.string()
    .email('Geçerli bir email adresi giriniz.')
    .required('Lütfen email adresinizi giriniz.'),
  petsName: Yup.string().max(50, 'Adı en fazla 50 karakter olabilir.'),
  petsBreed: Yup.string().max(50, 'Cins en fazla 50 karakter olabilir.'),
  appointmentNote: Yup.string().max(
    500,
    'Randevu notunuz en fazla 500 karakter olabilir.'
  )
});

const initialStateDebug = {
  name: 'Selim',
  surname: 'Sevgi',
  email: 'selim@sevgi.com',
  phone: '5433334455',
  selectedPetsSpecies: '',
  petsName: 'joy',
  petsBreed: '',
  selectedAppointmentReasons: [],
  selectedDateTime: '',
  appointmentNote: ''
};

const initialState = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  selectedPetsSpecies: '',
  petsName: '',
  petsBreed: '',
  selectedAppointmentReasons: [],
  selectedDateTime: '',
  appointmentNote: ''
};

function getInitialState() {
  if (process.env.NODE_ENV === 'development') {
    return initialStateDebug;
  } else {
    return initialState;
  }
}

class AppointmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: false
    };
  }

  handleSubmit = (values, actions) => {
    console.log('values', values);
    this.setState({ completed: true });
  };

  render() {
    return (
      <Container>
        {this.state.completed ? (
          <Message
            icon={'check'}
            attached
            header="Randevu Talebiniz Başarıyla Alınmıştır!"
            content="Bizi tercih ettiğiniz için teşekkür ederiz. Randevu talebinize en kısa süre geri dönüş yapılacaktır."
          />
        ) : (
          <React.Fragment>
            <Message
              icon={'paw'}
              attached
              header="Lovepet Veteriner Kliniği Online Randevu Formu!"
              content="Formdaki alanları doldurarak randevu talebinizi oluşturabilirsiniz. Yıldızlı alanların doldurulması zorunludur."
            />
            <Formik
              onSubmit={this.handleSubmit}
              validationSchema={AppointmentSchema}
              initialValues={getInitialState()}
              render={({
                values,
                status,
                errors,
                isValid,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue
              }) => (
                <Form className="attached fluid segment" loading={isSubmitting}>
                  <Form.Group widths="equal">
                    <Form.Field
                      required
                      fluid
                      error={touched.name && errors.name}
                    >
                      <label>Adınız</label>
                      <input
                        placeholder="Adınız"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      />
                      <FieldHelperText
                        touched={touched.name}
                        error={errors.name}
                      />
                    </Form.Field>
                    <Form.Field
                      required
                      fluid
                      error={touched.surname && errors.surname}
                    >
                      <label>Soyadınız</label>
                      <input
                        placeholder="Soyadınız"
                        name="surname"
                        value={values.surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      />
                      <FieldHelperText
                        touched={touched.surname}
                        error={errors.surname}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      required
                      fluid
                      error={touched.email && errors.email}
                    >
                      <label>Email Adresiniz</label>
                      <input
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="email"
                      />
                      <FieldHelperText
                        touched={touched.email}
                        error={errors.email}
                      />
                    </Form.Field>
                    <Form.Field
                      required
                      fluid
                      error={touched.phone && errors.phone}
                    >
                      <label>Cep Telefonu Numarınız</label>
                      <input
                        placeholder="5xx4445566"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      />
                      <FieldHelperText
                        touched={touched.phone}
                        error={errors.phone}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      required
                      fluid
                      error={
                        touched.selectedPetsSpecies &&
                        errors.selectedPetsSpecies
                      }
                    >
                      <label>Pet Hayvanınızın Türü</label>
                      <Dropdown
                        fluid
                        selection
                        // it does not have name prop
                        options={petOptions}
                        placeholder="Pet Hayvanınızın Türünü Seçin"
                        onChange={(e, { value }) => {
                          setFieldValue('selectedPetsSpecies', value);
                        }}
                      />
                      <FieldHelperText
                        touched={touched.selectedPetsSpecies}
                        error={errors.selectedPetsSpecies}
                      />
                    </Form.Field>
                    <Form.Field
                      required
                      fluid
                      error={
                        touched.selectedAppointmentReasons &&
                        errors.selectedAppointmentReasons
                      }
                    >
                      <label>Randevu Talebinizin Neden(ler)i</label>
                      <Dropdown
                        selection
                        multiple
                        name="selectedAppointmentReasons"
                        options={appointmentReasons}
                        placeholder="Randevu Talebinizin Neden(ler)i"
                        onChange={(e, { value }) => {
                          setFieldValue('selectedAppointmentReasons', value);
                        }}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field
                      fluid
                      error={touched.petsName && errors.petsName}
                    >
                      <label>Dostumuzun Adı</label>
                      <input
                        placeholder="Dostumuzun Adı"
                        name="petsName"
                        value={values.petsName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      />
                      <FieldHelperText
                        touched={touched.petsName}
                        error={errors.petsName}
                      />
                    </Form.Field>

                    <Form.Field
                      fluid
                      error={touched.petsBreed && errors.petsBreed}
                    >
                      <label>Dostumuzun Cinsi</label>
                      <input
                        placeholder="Dostumuzun Cinsi"
                        name="petsBreed"
                        value={values.petsBreed}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="text"
                      />
                      <FieldHelperText
                        touched={touched.petsBreed}
                        error={errors.petsBreed}
                      />
                    </Form.Field>
                  </Form.Group>
                  <Form.Field
                    required
                    fluid
                    error={touched.selectedDateTime && errors.selectedDateTime}
                  >
                    <label>Randevu Günü ve Saati</label>
                    <DateTimeInput
                      inline
                      clearable
                      closable
                      localization="tr"
                      name="selectedDateTime"
                      placeholder="Randevu Günü ve Saati"
                      value={values.selectedDateTime}
                      minDate={moment()}
                      maxDate={moment().add(1, 'month')}
                      iconPosition="left"
                      onChange={(event, { name, value }) => {
                        setFieldValue(name, value);
                      }}
                    />
                    <FieldHelperText
                      touched={touched.selectedDateTime}
                      error={errors.selectedDateTime}
                    />
                  </Form.Field>
                  <Form.Field
                    fluid
                    error={touched.appointmentNote && errors.appointmentNote}
                  >
                    <label>Randevu Notu</label>
                    <TextArea
                      name="appointmentNote"
                      value={values.appointmentNote}
                      label="Randevu Açıklaması"
                      placeholder="Randevu talebiniz ile ilgili notları ve özel istekleri yazabilirsiniz..."
                      style={{ minHeight: 100 }}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FieldHelperText
                      touched={touched.appointmentNote}
                      error={errors.appointmentNote}
                    />
                  </Form.Field>
                  <Button
                    color="blue"
                    disabled={isSubmitting || !isValid}
                    loading={isSubmitting}
                    type="submit"
                    onClick={handleSubmit}
                    content="Randevuyu Talep Et"
                  />
                </Form>
              )}
            />
          </React.Fragment>
        )}
        <Message attached="bottom" warning>
          <Icon name="help" />
          Randevu onayınız tarafınıza email veya sms yoluyla bildirilecektir.
        </Message>
      </Container>
    );
  }
}

export default AppointmentForm;

const petOptions = [
  {
    key: 'cat',
    text: 'Kedi',
    value: 'cat'
    // image: { avatar: true, src: '/images/avatar/small/jenny.jpg' }
  },
  {
    key: 'dog',
    text: 'Köpek',
    value: 'dog'
    // image: { avatar: true, src: '/images/avatar/small/elliot.jpg' }
  }
];

const appointmentReasons = [
  {
    key: 1,
    text: 'Yıllık Fiziksel Tedavi',
    value: 1,
    content: (
      <Header
        // icon="calendar outline"
        content="Yıllık Fiziksel Tedavi"
        subheader=""
      />
    )
  },
  {
    key: 2,
    text: 'Aşılar',
    value: 2,
    content: <Header content="Aşılar" subheader="Aşılar" />
  },
  {
    key: 3,
    text: 'Ağız/Diş Bakımı',
    value: 3,
    content: (
      <Header
        // icon="stopwatch"
        content="Ağız/Diş Bakımı"
        subheader="12 saat öncesinden dostumuza yiyecek ve su vermeyin lütfen."
      />
    )
  },
  {
    key: 4,
    text: 'Yeni Hasta/Misafir Ziyareti',
    value: 4,
    content: (
      <Header
        // icon="paw"
        content="Yeni Hasta/Misafir Ziyareti"
        subheader="Hasta alımı ve geçmiş tedavi bilgileri için lütfen 10-15 dakika erken gelin."
      />
    )
  },
  {
    key: 5,
    text: 'Hasta Pet Muayenesi',
    value: 5,
    content: (
      <Header
        // icon="emergency"
        content="Hasta Pet Muayenesi"
        subheader="Acilse direkt bize ulaşabilirsiniz. Sorunu notlarda belirtin lütfen."
      />
    )
  }
];
