import React, { useEffect, useState } from 'react';

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from 'primereact/inputtext';
import 'primeflex/primeflex.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectHastane, setHastane } from "../../redux/slices/appSlice";
import HastaneService from './HastaneService';
import AdresService from './AdresService';
import { Button } from 'primereact/button';
import axios from 'axios';
import Select from 'react-select'
import CityService from './CityService';
import { Dropdown } from 'primereact/dropdown';
import DistrictService from './DistrictService';
import NeighborhoodService from './NeighborhoodService';




const HastaneExample = () => {
    //let [hastane,setHastane]=useState([]);
    const storeHastane = useSelector(selectHastane)
    const [hospitalName, setHospitalName] = useState({})
    const [addressName, setAddressName] = useState({})
    const [cityNames, setCityNames] = useState({})
    const [districtNames, setDistrictNames] = useState({})
    const [neighborhoodNames, setNeighborhoodNames] = useState({})
    const [city, setCity] = useState()
    const [neighborhood, setNeighborhood] = useState()
    const [district, setDistrict] = useState()
    const [selectedCityID, setSelectedCityID] = useState()
    const [inputValue, setInputValue] = useState({ hospitalName: "" })
    const dispatch = useDispatch()
    const [inEditMode, setInEditMode] = useState(false)


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const citySelectItems = [
        { label: 'New York', value: 'NY' },
        { label: 'Rome', value: 'RM' },
        { label: 'London', value: 'LDN' },
        { label: 'Istanbul', value: 'IST' },
        { label: 'Paris', value: 'PRS' }
    ];


    // useEffect(() => {
    //     new HastaneService().getAllHastane().then((data) => {
    //         setHastane(data)
    //         console.log(hastane);
    //     });
    // },[]);


    const onClickSave = event => {
        event.preventDefault();
        axios.post('http://localhost:8080/create', hospitalName);

    }

    const onClickSaveAdresHastane = event => {
        event.preventDefault();
        axios.post('http://localhost:8080/adrescreate', addressName).then(function (response) {
            console.log(response.data.addressid);
            // axios.post('http://localhost:8080/create', hospitalName,response.data.addressid);
            axios({
                method: 'POST',
                url: 'http://localhost:8080/create/' + response.data.addressid + '/' + neighborhood.neighborhoodid + '/' + district.districtid,
                headers: {},
                data: {
                    hospitalName: hospitalName.hospitalName

                }

            })
            console.log(neighborhood, district);

        })

    }



    const onClickDelete = (id) => {


        axios.delete('http://localhost:8080/delete/' + id);
        pageRefresh()

    }

    const onclickUpdate = (inputValue) => {
        // axios.post('http://localhost:8080/update/' + inputValue.id,{
        //     hospitalName:inputValue.hospitalName
        // });

        axios({
            method: 'PUT',
            url: 'http://localhost:8080/update/' + inputValue.id,
            headers: {},
            data: {
                hospitalName: inputValue.hospitalName
            }
        })

    }
    const pageRefresh = () => {
        window.location.reload()
    }


    useEffect(() => {
        const getAllHastane = async () => {
            const data = await HastaneService.getAllHastane();
            dispatch(setHastane(data));
        };
        getAllHastane();

    }, [dispatch]);




    const actionBodyTemplate = (data) => {
        return (
            <p>
                <Button label="Delete" className="p-button-rounded p-button-danger" onClick={() => {

                    onClickDelete(data.id)
                }} />&nbsp;
                <Button label="Update" className="p-button-rounded p-button-secondary" onClick={() => {
                    setInputValue(data)
                    setInEditMode(true)
                }} />
            </p>

        );
    }

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


    useEffect(() => {
        getAllCity()
        getAllDistrict()
        getAllNeighborhood()
    }, [])

    // useEffect(() => {
    //     console.log(selectedCityID, typeof selectedCityID);
    // }, [selectedCityID])


    return (


        <React.Fragment>
            {/* <div>
                <h4>HASTANE EKLE</h4>
                <div>
                    <label>Hastane Adı </label>

                    {inEditMode ? <InputText type="text" placeholder="Hospital Name"
                        value={inputValue.hospitalName}
                        onChange={(event) => {
                            setInputValue({ id: inputValue.id, hospitalName: event.target.value })
                        }}

                    /> : <InputText type="text" placeholder="Hospital Name"
                       value={inputValue.hospitalName.value}
                        onChange={(event) => {
                            setHospitalName({ id: inputValue.id, hospitalName: event.target.value })                            
                        }}
                    />}

                 
                    {!inEditMode &&
                        <Button type="button" label="Add"
                            onClick={onClickSave}
                        />}
                    {inEditMode &&
                        <><Button type="button" className="p-button-rounded p-button-secondary" label="Update" onClick={() => {
                            pageRefresh()
                            onclickUpdate(inputValue)
                        }} />
                            <Button type="button" className="p-button-rounded p-button-danger" label="Cancel" onClick={() => {
                                setInEditMode(false);
                                setInputValue({ id: 0, hospitalName: "31313" });
                            }} />   </>
                    }
                </div>

            </div> */}

            <div>
                <h4>HASTANE EKLE</h4>
                <div>
                    <label>Hastane Adı</label>

                    <Dropdown optionLabel="cityName" value={city} options={cityNames} onChange={(e) => setCity(e.value)} placeholder="Select a City" />
                    <Dropdown optionLabel="districtName" value={district} options={districtNames} onChange={(e) => setDistrict(e.value)} placeholder="Select a District" />
                    <Dropdown optionLabel="neighborhoodName" value={neighborhood} options={neighborhoodNames} onChange={(e) => { setNeighborhood(e.value) }} placeholder="Select a Neighborhood" />

                    <InputText type="text" placeholder="Adres Name"
                        value={addressName.value}
                        onChange={(event) => {
                            setAddressName({ id: addressName.addressid, addressName: event.target.value })
                        }}
                    />
                    <InputText type="text" placeholder="Hospital Name"
                        value={inputValue.hospitalName.value}
                        onChange={(event) => {
                            setHospitalName({ id: inputValue.id, hospitalName: event.target.value })
                        }}
                    />


                    {!inEditMode &&
                        <Button type="button" label="Add"
                            onClick={onClickSaveAdresHastane}
                        />}
                    {inEditMode &&
                        <><Button type="button" className="p-button-rounded p-button-secondary" label="Update" onClick={() => {
                            pageRefresh()
                            onclickUpdate(inputValue)
                        }} />
                            <Button type="button" className="p-button-rounded p-button-danger" label="Cancel" onClick={() => {
                                setInEditMode(false);
                                setInputValue({ id: 0, hospitalName: "31313" });
                            }} />   </>
                    }
                </div>

            </div>
            <div className="p-grid">
                <div className="p-col">
                    <div className="p-card">
                        <DataTable value={storeHastane}>
                            <Column field="id" header="Id"></Column>
                            <Column field="hospitalName" header="Name"></Column>
                            <Column field="addressid.addressName" header="Address"></Column>
                            <Column body={actionBodyTemplate} header="EDİT "></Column>
                        </DataTable>
                    </div>
                </div>

            </div>
        </React.Fragment>

    )

};

export default HastaneExample;