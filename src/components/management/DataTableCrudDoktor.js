import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import axios from 'axios';
import { Toolbar } from 'primereact/toolbar';
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import './DataTableDemo.css';
import { selectDoktor, setDoktor } from "../../redux/slices/appSlice";
import HastaneService from '../hastaneComponent/HastaneService';
import { Dropdown } from 'primereact/dropdown';
import DoktorService from '../hastaneComponent/DoktorService';
import DepartmentService from '../hastaneComponent/DepartmentService';

const DataTableCrudDoktor = () => {


    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    // ------------------------------------------------
    const [product, setProduct] = useState(null)
    const storeDoktor = useSelector(selectDoktor)
    const [doktorName, setDoktorName] = useState({})
    const [inputValue, setInputValue] = useState({ doktorName: "" })
    const dispatch = useDispatch()
    const [inEditMode, setInEditMode] = useState(false)
    const [hospitalNames, setHospitalNames] = useState({})
    const [departmentNames, setDepartmentNames] = useState({})
    const [hospital, setHospital] = useState()
    const [department, setDepartment] = useState()


    useEffect(() => {
        const getAllDoktor = async () => {
            const data = await DoktorService.getAllDoktor();
            dispatch(setDoktor(data));
        };
        getAllDoktor();

    }, [dispatch]);


    const openNew = () => {
        setSubmitted(false);
        setProductDialog(true);

    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
        setInEditMode(false);
        setInputValue({ doktorName: "" });
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }


    const onClickSaveAdresHastane = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:8080/doktorcreate/' + department.id + '/' + hospital.id,
            headers: {},
            data: {
                doktorName: doktorName.doktorName

            }

        })


    }
    const getAllDepartman = async () => {
        const data = await DepartmentService.getAllDepartman()
        setDepartmentNames(data)
        return data
    }
    const getAllHospital = async () => {
        const data = await HastaneService.getAllHastane()
        setHospitalNames(data)
        return data
    }


    useEffect(() => {
        getAllDepartman()
        getAllHospital()
    }, [])

    const onclickUpdate = (inputValue) => {
        axios({
            method: 'PUT',
            url: 'http://localhost:8080/updateDoktor/' + inputValue.id,
            headers: {},
            data: {
                doktorName: inputValue.doktorName,
            }
        })
    }
    //    const onclickUpdateAdres = (inputValueAdres) => {
    //     // axios.post('http://localhost:8080/update/' + inputValue.id,{
    //     //     hospitalName:inputValue.hospitalName
    //     // });

    //     axios({
    //         method: 'PUT',
    //         url: 'http://localhost:8080/updateAdres/' + inputValueAdres.addressid,
    //         headers: {},
    //         data: {
    //             addressName: inputValueAdres.addressName
    //         }
    //     })


    // }

    const onClickDelete = (id) => {


        axios.delete('http://localhost:8080/deleteDoktor/' + id);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Doctor Deleted', life: 3000 });

    }
    const pageRefresh = () => {
        window.location.reload()
    }




    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }




    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }



    const actionBodyTemplate = (data) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => {
                    setInputValue(data)
                    setInEditMode(true)
                    setProductDialog(true);
                }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => {
                    onClickDelete(data.id)
                }} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Doktors</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            {!inEditMode ? <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onClickSaveAdresHastane} />
                : <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={() => { onclickUpdate(inputValue) }} />}
        </React.Fragment>
    );
    const deleteProductDialogFooter = (

        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={() => {
                pageRefresh()

            }} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={storeDoktor} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} doctor"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="İd" sortable></Column>
                    <Column field="doktorName" header="Doktor Name" sortable></Column>
                    <Column field="hastane.hospitalName" header="Hospital Name" sortable></Column>
                    <Column field="departman.departmanName" header="Departman Name" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Doktor Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    <Dropdown optionLabel="hospitalName" value={hospital} options={hospitalNames} onChange={(e) => setHospital(e.value)} placeholder="Select a Hospital" /><br />
                    <Dropdown optionLabel="departmanName" value={department} options={departmentNames} onChange={(e) => { setDepartment(e.value) }} placeholder="Select a Department" /><br />
                    {!inEditMode ? <InputText id="name" placeholder="Doktor Name" value={inputValue.doktorName.value}
                        onChange={(event) => {
                            setDoktorName({ id: inputValue.id, doktorName: event.target.value })
                        }} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                        : <InputText id="name" value={inputValue.doktorName}
                            onChange={(event) => {
                                setInputValue({ id: inputValue.id, doktorName: event.target.value })
                            }} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />}
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                {/* <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="p-field">
                    <label className="p-mb-3">Category</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                    </div> */}
                {/* </div> */}
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
export default DataTableCrudDoktor;