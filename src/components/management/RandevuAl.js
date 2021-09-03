import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import HastaneService from '../hastaneComponent/HastaneService';
import CityService from '../hastaneComponent/CityService';
import DistrictService from '../hastaneComponent/DistrictService';
import NeighborhoodService from '../hastaneComponent/NeighborhoodService';
import DepartmentService from '../hastaneComponent/DepartmentService';
import DoktorService from '../hastaneComponent/DoktorService';
import Moment from 'moment';
import './FormDemo.css';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Column } from 'primereact/column';
const RandevuAl = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true)
    const [hospital, setHospital] = useState([{}])
    const [hospitalNames, setHospitalNames] = useState()
    const [cityNames, setCityNames] = useState({})
    const [districtNames, setDistrictNames] = useState([{}])
    const [neighborhoodNames, setNeighborhoodNames] = useState()
    const [city, setCity] = useState([{}])
    const [neighborhood, setNeighborhood] = useState([{}])
    const [district, setDistrict] = useState([{}])
    const [departmentNames, setDepartmentNames] = useState()
    const [department, setDepartment] = useState([{}])
    const [doktor, setDoktor] = useState({});
    const [doktorNames, setDoktorNames] = useState([{}]);
    const [randevuTarihi, setRandevuTarihi] = useState(null);
    const [onlineDoktorFiltres, setOnlineDoktorFiltres] = useState([{}]);
    const [randevuMod, setRandevuMod] = useState(false);
    const [onayMessage, setOnayMessage] = useState(false);
    const [bilgi, setBilgi] = useState();

    const defaultValues = {
        name: '',
        email: '',
        tel: '',
        tc: ''
    }

    // const paymentOptions = [
    //     { name: '10:00 - 10:10' },
    //     { name: '10:10 - 10:20' },
    //     { name: '10:20 - 10:30' }

    // ];


    const getAllCity = async () => {
        const data = await CityService.getAllCity()
        setCityNames(data)
        return data
    }

    const getAllDistrict = async () => {
        const data = await DistrictService.getAllDistrict()
        setDistrictNames(data)
        return data
    }

    const getAllNeighborhood = async () => {
        const data = await NeighborhoodService.getAllNeighborhood()
        setNeighborhoodNames(data)
        return data
    }
    const getAllHospital = async () => {
        const data = await HastaneService.getAllHastane()
        setHospitalNames(data)
        return data
    }
    const getAllDepartman = async () => {
        const data = await DepartmentService.getAllDepartman()
        setDepartmentNames(data)
        return data
    }
    const getAllDoktor = async () => {
        const data = await DoktorService.getAllDoktor()
        setDoktorNames(data)
        return data
    }


    useEffect(async () => {
        await getAllCity()
        await getAllDistrict()
        await getAllNeighborhood()
        await getAllHospital()
        await getAllDepartman()
        await getAllDoktor()
        setLoading(false)
    }, [])

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = (data) => {   
        
        setShowMessage(true);

        if (data.name && data.tc && data.tel) {
            setOnayMessage(true)
            onClickSaveRandevu(bilgi,data)
            console.log(data);
        }

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const onClickSaveRandevu = (data,temelBilgi) => {
        console.log(data);
        axios({
            method: 'POST',
            url: 'http://localhost:8080/createAppointment/' + data.id,
            headers: {},
            data: {
                appointment_date: Moment(data.startDate).format('YYYY-MM-DD'),
                patientName: temelBilgi.name,
                tcId:temelBilgi.tc,
                telephoneNumber:temelBilgi.tel,
                email:temelBilgi.email
            }

        }).then(
            axios({
                method: 'PUT',
                url: 'http://localhost:8080/updateOnlineDoktorIsEmptyAppointment/' + data.id,
                headers: {},
                data: {
                    isEmpty: false
                }
            })

        )

    }
    const getFiltre = event => {

        const url = 'http://localhost:8080/onlinedoctorsfiltre?startDate=' + Moment(randevuTarihi).format('YYYY-MM-DD') + '&finishDate=' + Moment(randevuTarihi).add(1, 'days').format('YYYY-MM-DD') + '&doktor=' + doktor.id
        return axios.get(url).then(res => res.data)
    }


    useEffect(() => {
        const getAllOnlineDoktorFiltre = async () => {
            const data = await getFiltre();
            setOnlineDoktorFiltres(data);
        };
        getAllOnlineDoktorFiltre();
    }, [randevuTarihi]);

    const actionBodyTemplate = (data) => {

        return (
            <React.Fragment>
                <Button style={{ paddingLeft: '60px' }} className="p-button-rounded p-button-success p-mr-2" onClick={() => {
                    setBilgi(data)
                }} >Randevu Al</Button>
            </React.Fragment>
        );
    }

    const pageRefresh = () => {
        window.location.reload()
    }
    const onayCheck = () => {

        if (formData.name && formData.tc && formData.tel) {
            // setOnayMessage(true)
            onClickSaveRandevu(bilgi)
            console.log(formData);
        }
        // if ((formData.name && formData.tc && formData.tel) || (formData.name && formData.tc && formData.tel && formData.email)) {
        //     // setOnayMessage(true)
        //     onClickSaveRandevu(bilgi)
        //     console.log(formData);
        // }
    }

    if (loading) {
        return (

            <ProgressSpinner style={{ marginLeft: "700px", marginTop: "250px" }} />
        )
    } else {


        return (

            <div className="form-demo">
                <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                    {!onayMessage ? <div className="p-d-flex  p-dir-col p-pt-6 p-px-3">
                        <i className="pi pi-arrow-right" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h5>Randevu Almak İçin Son Bir Adım..</h5>
                        <div className="form-demo">

                            <div className="p-d-flex p-jc-center">
                                <div className="card">
                                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                                        <div className="p-field">
                                            <span className="p-float-label">
                                                <Controller name="name" control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                )} />
                                                <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Ad Soyad*</label>
                                            </span>
                                            {getFormErrorMessage('name')}
                                        </div>
                                        <div className="p-field">
                                            <span className="p-float-label">
                                                <Controller name="tel" control={control} rules={{ required: 'Telefon is required.' }} render={({ field, fieldState }) => (
                                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                )} />
                                                <label htmlFor="tel" className={classNames({ 'p-error': errors.tel })}>Telefon Numarası*</label>
                                            </span>
                                            {getFormErrorMessage('tel')}
                                        </div>
                                        <div className="p-field">
                                            <span className="p-float-label">
                                                <Controller name="tc" control={control} rules={{ required: 'TCNO is required.' }} render={({ field, fieldState }) => (
                                                    <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                )} />
                                                <label htmlFor="tc" className={classNames({ 'p-error': errors.tc })}>TC Kimlik Numarası*</label>
                                            </span>
                                            {getFormErrorMessage('tc')}
                                        </div>
                                        <div className="p-field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-envelope" />
                                                <Controller name="email" control={control}
                                                    rules={{ pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                                                    render={({ field, fieldState }) => (
                                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                                    )} />
                                                <label htmlFor="email">Email</label>
                                            </span>

                                        </div>



                                        <Button type="submit" label="Onayla" className="p-mt-2"  />
                                        <Button label="İptal" className="p-button-text" autoFocus onClick={() => {
                                            setShowMessage(false)
                                        }} ></Button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div> : <></>}

                    {onayMessage ? <div className="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
                        <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                        <h5>Randevu Alma Başarılı</h5>
                        <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                            Sayın <b>{formData.name}</b> ; <b>{Moment(randevuTarihi).format('YYYY-MM-DD')}</b> Tarihinde  <b>{hospital.hospitalName}</b>  --- <b>{department.departmanName}</b> --- <b>{doktor.doktorName}</b> doktorumuzdan almış olduğunuz randevunuz sisteme kaydedilmiştir.Sağlıklı günler.
                            <hr></hr>
                            <div><img src="./doctor.png" width="40" height="40" style={{ margin: "5px" }}></img> <b style={{ fontFamily: "Calibri" }} >{doktor.doktorName}</b></div><br />
                            <div><img src="./hospital.png" width="40" height="40" style={{ margin: "5px" }}></img> <b style={{ fontFamily: "Calibri" }}>{hospital.hospitalName}</b></div><br />
                            <div><img src="./vaccine.png" width="40" height="40" style={{ margin: "5px" }}></img> <b style={{ fontFamily: "Calibri" }}>{department.departmanName}</b></div>
                        </p>
                        <Button label="KAPAT" className="p-button-text" autoFocus onClick={() => {
                            setShowMessage(false)
                            pageRefresh()
                        }} ></Button>
                    </div> : <></>}
                </Dialog>


                <div className="p-jc-center p-p-5">
                    <div className="card p-p-9"><br />
                        <h5 className="p-text-center">Randevu Al <i className="pi pi-user" /></h5>
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="p-field">
                                <span className="p-float-label"> </span>
                            </div>
                            <div className="p-field">
                                <Dropdown optionLabel="cityName" value={city} options={cityNames} onChange={(e) => setCity(e.value)} placeholder="Select a City" /><br />
                                <Dropdown optionLabel="districtName" value={district} options={districtNames.filter(e => e.cityid.cityid === city.cityid)} onChange={(e) => { setDistrict(e.value) }} placeholder="Select a District" /><br />
                                <Dropdown optionLabel="neighborhoodName" value={neighborhood} options={neighborhoodNames.filter(e => e.districtid.districtid === district.districtid)} onChange={(e) => {
                                    setNeighborhood(e.value)
                                    console.log(neighborhood);
                                }} placeholder="Select a Neighborhood" /><br />
                                <Dropdown optionLabel="hospitalName" value={hospital} options={hospitalNames.filter(e => e.addressid.neighborhoodid.neighborhoodid === neighborhood.neighborhoodid)} onChange={(e) => {
                                    setHospital(e.value)
                                    console.log(hospital);
                                }} placeholder="Select a Hospital" /><br />
                                <Dropdown optionLabel="departmanName" value={department} options={departmentNames} onChange={(e) => {
                                    setDepartment(e.target.value)
                                    console.log(hospital);
                                }} placeholder="Select a Department" /><br />
                                <Dropdown optionLabel="doktorName" value={doktor} options={doktorNames.filter(e => (e.departman.id === department.id))} onChange={(e) => setDoktor(e.value)} placeholder="Select a Doktor" />
                                {/* && (e.hastane.id === hospital.id) */}
                            </div>

                            <div className="p-field">
                                <span className="p-float-label">
                                    <Controller name="date" control={control} render={({ field }) => (
                                        <Calendar id={field.name} value={randevuTarihi} onChange={(e) => {
                                            setRandevuTarihi(e.value)
                                            setRandevuMod(true)
                                        }} dateFormat="yy-mm-dd" mask="99/99/9999" showIcon />
                                    )} />
                                    <label htmlFor="date">Randevu Tarihi Seçiniz</label>
                                    {randevuMod ? <DataTable value={onlineDoktorFiltres}
                                        dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} appointments"
                                    >

                                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                                        <Column field="id" header="İd" sortable></Column>
                                        <Column field="startDate" header="Start Date" sortable></Column>
                                        <Column field="finishDate" header="Finish Date" sortable></Column>
                                        <Column field="doktor.doktorName" header="Doktor Name" sortable></Column>
                                        <Column field="doktor.departman.departmanName" header="Departman Name" sortable></Column>
                                        <Column body={actionBodyTemplate}></Column>
                                    </DataTable> : <div></div>}

                                </span>
                                {/* <SelectButton value={value3} options={dateFiltre} onChange={(e) => setValue3(e.value)} optionLabel="name" /> */}

                            </div>
                            {/* <Button type="submit" label="Kaydet" className="p-mt-2" /> */}
                        </form>
                    </div>
                </div>

            </div>

        );
    }
}

export default RandevuAl;