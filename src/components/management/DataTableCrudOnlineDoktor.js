import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
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
import { selectOnlineDoktor, setOnlineDoktor } from "../../redux/slices/appSlice";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { addLocale } from 'primereact/api';
import OnlineDoktorService from '../hastaneComponent/OnlineDoktorService';
import DoktorService from '../hastaneComponent/DoktorService';

const DataTableCrudOnlineDoktor = () => {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month - 1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;

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
    const storeOnlineDoktor = useSelector(selectOnlineDoktor)
    const [inputValue, setInputValue] = useState({ onlineDoktorName: "", startDate: "", finishDate: "" })
    const dispatch = useDispatch()
    const [inEditMode, setInEditMode] = useState(false)
    const [baslangicDate, setBaslangicDate] = useState(null);
    const [bitisDate, setBitisDate] = useState(null);
    const [doktor, setDoktor] = useState({});
    const [doktorNames, setDoktorNames] = useState({});



    addLocale('es', {
        firstDayOfWeek: 1,
        dayNamesMin: ['Paz', 'Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt'],
        dayNamesShort: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        today: 'Hoy',
        clear: 'Claro'
    });

    useEffect(() => {
        const getAllOnlineDoktor = async () => {
            const data = await OnlineDoktorService.getAllOnlineDoktor();
            dispatch(setOnlineDoktor(data));
        };
        getAllOnlineDoktor();

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


    const onClickSaveOnlineDoktor = event => {
        event.preventDefault();

        axios({
            method: 'POST',
            url: 'http://localhost:8080/onlinedoktorcreate/' + doktor.id,
            headers: {},
            data: {
                finishDate: Moment(bitisDate).format('YYYY-MM-DD HH:mm:ss'),
                startDate: Moment(baslangicDate).format('YYYY-MM-DD HH:mm:ss'),
                isEmpty: true
            }
        })

    }
    // const getAllDepartman = async () => {
    //     const data = await DepartmentService.getAllDepartman()
    //     setDepartmentNames(data)
    //     return data
    // }
    const getAllDoktor = async () => {
        const data = await DoktorService.getAllDoktor()
        setDoktorNames(data)
        return data
    }


    useEffect(() => {
        getAllDoktor()
    }, [])

    const onclickUpdate = (inputValue) => {
        axios({
            method: 'PUT',
            url: 'http://localhost:8080/updateOnlineDoktor/' + inputValue.id,
            headers: {},
            data: {
                startDate: Moment(baslangicDate).format('YYYY-MM-DD HH:mm:ss'),
                finishDate: Moment(bitisDate).format('YYYY-MM-DD HH:mm:ss'),
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


        axios.delete('http://localhost:8080/deleteOnlineDoktor/' + id);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

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
                    console.log(data);
                }} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => {
                    onClickDelete(data.id)

                }} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage OnlineDoctors</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            {!inEditMode ? <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={onClickSaveOnlineDoktor} />
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

                <DataTable ref={dt} value={storeOnlineDoktor} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} online doctor"
                    globalFilter={globalFilter}
                    header={header}>

                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="id" header="İd" sortable></Column>
                    <Column field="startDate" header="Start Date" sortable></Column>
                    <Column field="finishDate" header="Finish Date" sortable></Column>
                    <Column field="doktor.doktorName" header="Doktor Name" sortable></Column>
                    <Column field="doktor.departman.departmanName" header="Departman Name" sortable></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="OnlineDoctor Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="p-field">
                    {!inEditMode ? <div className="p-field p-col-12">
                        <label htmlFor="time24">Başlangıç Tarihi</label>
                        <Calendar id="time24" locale="es" value={baslangicDate} onChange={(e) => setBaslangicDate(e.value)} dateFormat="yy-mm-dd" showIcon showTime showSeconds />
                    </div>
                        : <div className="p-field p-col-12">
                            <label htmlFor="time24">Başlangıç Tarihi</label>
                            <Calendar id="time24" locale="es" value={baslangicDate} onChange={(e) => setBaslangicDate(e.value)} dateFormat="yy-mm-dd" showIcon showTime showSeconds />
                        </div>}
                    {!inEditMode ? <div className="p-field p-col-12">
                        <label htmlFor="time24">Bitiş Tarihi</label>
                        <Calendar id="time24" locale="es" value={bitisDate} onChange={(e) => setBitisDate(e.value)} dateFormat="yy-mm-dd" showIcon showTime showSeconds />
                    </div>
                        : <div className="p-field p-col-12">
                            <label htmlFor="time24">Bitiş Tarihi</label>
                            <Calendar id="time24" locale="es" value={bitisDate} onChange={(e) => setBitisDate(e.value)} dateFormat="yy-mm-dd" showIcon showTime showSeconds />
                        </div>}
                    {!inEditMode ? <Dropdown optionLabel="doktorName" value={doktor} options={doktorNames} onChange={(e) => setDoktor(e.value)} placeholder="Select a Doktor" />
                        : <Dropdown optionLabel="doktorName" value={inputValue.doktor} options={doktorNames} onChange={(e) => console.log(inputValue)} placeholder="Select a Doktor" />}<br />
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
export default DataTableCrudOnlineDoktor;