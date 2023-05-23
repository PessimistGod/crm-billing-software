import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import Company from "@/Models/createCompany";
import ProductList from '@/Models/createProduct'
import connectDB from '@/Middleware/db';
import PopupFormProduct from '../Create/popup/productCreate'


const createSales = ({ companies }) => {
    const [salesOwner, setSalesOwner] = useState(null);
    const [dealName, setDealName] = useState("")
    const [subject, setSubject] = useState("")
    const [purchaseOrder, setPurchaseOrder] = useState("")
    const [customerNumber, setCustomerNumber] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [carrier, setCarrier] = useState("")
    const [contactName, setContactName] = useState("")
    const [salesCommission, setSalesCommission] = useState("")
    const [status, setStatus] = useState("Created")
    const [accName, setAccName] = useState("")
    const [billingStreet, setBillingStreet] = useState("")
    const [shippingStreet, setShippingStreet] = useState("")
    const [billingCity, setBillingCity] = useState("")
    const [billingState, setBillingState] = useState("")
    const [billingCode, setBillingCode] = useState("")
    const [billingCountry, setBillingCountry] = useState("")
    const [shippingCity, setShippingCity] = useState("")
    const [shippingState, setShippingState] = useState("")
    const [shippingCode, setShippingCode] = useState("")
    const [shippingCountry, setShippingCountry] = useState("")

    const [rows, setRows] = useState([
        {
            sn: '',
            prodName: '',
            qty: '',
            price: '',
            amount: '',
            discount: '',
            tax: '',
            total: '',
        },
    ]);
    const [subTotal, setSubTotal] = useState("")
    const [totalDiscount, setTotalDiscount] = useState("")
    const [totalTax, setTotalTax] = useState("")
    const [grandTotal, setGrandTotal] = useState("")
    const [registration, setRegistration] = useState("")
    const [createDate, setCreateDate] = useState("")



    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt_decode(token);
                if (decodedToken) {
                    setRegistration(decodedToken.id);
                } else {
                    setRegistration("");
                }
            }
        } catch (error) {
            console.log(error);
            setRegistration("");
        }
    }, [])



    // Add Row
    const handleAddRow = () => {
        const newRow = {
            sn: '',
            prodName: '',
            qty: '',
            price: '',
            amount: '',
            discount: '',
            tax: '',
            total: '',
        };
        setRows([...rows, newRow]);
    };

    // Remove Row
    const handleRemoveRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };


    const [products, setProducts] = useState([]);

 
  

      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/fetchProduct');
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      };

    const handleChange = (e) => {
        if (e.target.name == 'salesOwner') {
            setSalesOwner(e.target.value)
        }
        if (e.target.name == 'dealName') {
            setDealName(e.target.value)
        }
        if (e.target.name == 'subject') {
            setSubject(e.target.value)
        }
        if (e.target.name == 'purchaseOrder') {
            setPurchaseOrder(e.target.value)
        }
        if (e.target.name == 'customerNumber') {
            setCustomerNumber(e.target.value)
        }
        if (e.target.name == 'dueDate') {
            setDueDate(e.target.value)
        }
        if (e.target.name == 'carrier') {
            setCarrier(e.target.value)
        }
        if (e.target.name == 'contactName') {
            setContactName(e.target.value)
        }
        if (e.target.name == 'salesCommission') {
            setSalesCommission(e.target.value)
        }
        if (e.target.name == 'status') {
            setStatus(e.target.value)
        }
        if (e.target.name == 'accName') {
            setAccName(e.target.value)
        }
        if (e.target.name == 'billingStreet') {
            setBillingStreet(e.target.value)
        }
        if (e.target.name == 'billingCity') {
            setBillingCity(e.target.value)
        }
        if (e.target.name == 'billingState') {
            setBillingState(e.target.value)
        }
        if (e.target.name == 'billingCode') {
            setBillingCode(e.target.value)
        }
        if (e.target.name == 'billingCountry') {
            setBillingCountry(e.target.value)
        }
        if (e.target.name == 'shippingCity') {
            setShippingCity(e.target.value)
        }
        if (e.target.name == 'shippingState') {
            setShippingState(e.target.value)
        }
        if (e.target.name == 'shippingCode') {
            setShippingCode(e.target.value)
        }
        if (e.target.name == 'shippingCountry') {
            setShippingCountry(e.target.value)
        }
        if (e.target.name == 'subTotal') {
            setSubTotal(e.target.value)
        }
        if (e.target.name == 'totalDiscount') {
            setTotalDiscount(e.target.value)
        }
        if (e.target.name == 'totalTax') {
            setTotalTax(e.target.value)
        }
        if (e.target.name == 'grandTotal') {
            setGrandTotal(e.target.value)
        }
        if (e.target.name == 'createDate') {
            setCreateDate(e.target.value)
        }
    }

    const SaleCreate = async () => {
        try {

            const data = { salesOwner, dealName, subject, purchaseOrder, customerNumber, dueDate, carrier, contactName, salesCommission, status, accName, billingStreet, shippingStreet, billingCity, billingState, billingCode, billingCountry, shippingCity, shippingState, shippingCode, shippingCountry, subTotal, totalDiscount, totalTax, grandTotal, rows, author: registration, createDate };


            // const totalQty = rows && Array.isArray(rows) ? (rows.reduce((acc, row) => acc + row.qty, 0), 0) : 0;



            // await fetch(`/api/Update/updateProduct/${productId}`, {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ qty: totalQty }),
            //   });


            let CreateContact = await fetch(`/api/Create/salesCreate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            let response = await CreateContact.json()

            if (response.error) {
                toast.error(response.error, {
                    position: "top-center",
                    autoClose: 1100,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (response.success) {
                toast.success(response.success, {
                    position: "top-center",
                    autoClose: 200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setSalesOwner("")
                setDealName("")
                setSubject("")
                setPurchaseOrder("")
                setCustomerNumber("")
                setDueDate("")
                setCarrier("")
                setContactName("")
                setSalesCommission("")
                setStatus("")
                setAccName("")
                setBillingStreet("")
                setShippingStreet("")
                setBillingCity("")
                setBillingState("")
                setBillingCode("")
                setBillingCountry("")
                setShippingCity("")
                setShippingState("")
                setShippingCode("")
                setShippingCountry("")
                setRows("")
                setSubTotal("")
                setTotalDiscount("")
                setTotalTax("")
                setGrandTotal("")
                setCreateDate("")



            }







        } catch (err) {
            console.error(err)
        }


    }

    // const [selectedProductTax, setSelectedProductTax] = useState(0);


    const [selectedProducts, setSelectedProducts] = useState([]);

    function fetchData(prodName, index) {
        const product = products.find((item) => item.productName === prodName);
        if (product) {
            const updatedProducts = [...selectedProducts];
            if (updatedProducts.length > index) {
                updatedProducts[index] = product;
            } else {
                updatedProducts.push(product);
            }
            setSelectedProducts(updatedProducts);
        }
    }




    const calculateSubTotal = () => {
        const subTotal = rows && Array.isArray(rows) ? rows.reduce((acc, row) => acc + (row.amount || 0), 0) : 0;
        setSubTotal(subTotal);
    };

    const calculateTotal = () => {
        const grandTotal = rows && Array.isArray(rows) ? rows.reduce((acc, row) => acc + (row.total || 0), 0) : 0;
        setGrandTotal(grandTotal);
    };

    const calculateDiscount = () => {
        try {

            const totalDiscount = rows && Array.isArray(rows) ? rows.reduce((acc, row) => acc + (parseInt(row.discount) || 0), 0) : 0;
            setTotalDiscount(totalDiscount);
        } catch (e) {
            console.log(e)
        }
    };

    const calculateTax = () => {
        const totalTax = rows && Array.isArray(rows) ? rows.reduce((acc, row) => acc + (parseInt(row.tax) || 0), 0) : 0;
        setTotalTax(totalTax);
    };


     function checkQuantity(prodName, requestedQuantity) {
        try {

            const product = products.find((item) => item.productName === prodName);
            if (product) {
                if (requestedQuantity > parseInt(product.qty)) {
                    return toast.error(`You Only Have ${product.qty} ${product.productName}`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                } else {
                    return ("Quantity available: " + product.qty);
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
 



  

  
    
    console.log({" Products": products });
    
    
    return (
        <section>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <div className='flex justify-end mr-5'>
                <Link href={'/'}>
                    <button className='px-5 py-2 mt-6 bg-red-600 text-sm mr-5 lg:text-base text-white rounded-[4px] shadow-md '>Cancel</button>
                </Link>
                <button onClick={SaleCreate} className='px-5 py-2 mt-6 bg-blue-600 text-sm lg:text-base text-white rounded-[4px] shadow-md'>Create Sale</button>
            </div>
            <h4 className='text-black font-extrabold text-xl text-center mt-4'>Create Sale</h4>

            <div className='container mx-auto'>
                <div className='overflow-x-auto grid lg:grid-cols-2 mt-16'>



                    <div>
                        <form onFocus={fetchProducts} className="w-full max-w-lg mx-auto mt-8">

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="salesOwner">
                                        Sales Owner
                                    </label>
                                    <input onChange={handleChange} name='salesOwner' value={salesOwner} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="salesOwner" type="text" placeholder="Sales Owner" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dealName">
                                        Deal Name
                                    </label>
                                    <input onChange={handleChange} name='dealName' value={dealName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="dealName" type="text" placeholder="Deal Name" />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="subject">
                                        Subject
                                    </label>
                                    <input onChange={handleChange} name='subject' value={subject} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="subject" type="text" placeholder="Subject" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="purchaseOrder">
                                        Purchase Order
                                    </label>
                                    <input onChange={handleChange} name='purchaseOrder' value={purchaseOrder} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="purchaseOrder" type="text" placeholder="Purchase Order" />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="customerNumber">
                                        Customer Number
                                    </label>
                                    <input onChange={handleChange} name='customerNumber' value={customerNumber} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="customerNumber" type="text" placeholder="Customer Number" />
                                </div>


                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dueDate">
                                        Due Date
                                    </label>
                                    <input onChange={handleChange} name='dueDate' value={dueDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="dueDate" type="date" />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="carrier">
                                        Carrier
                                    </label>
                                    <input onChange={handleChange} name='carrier' value={carrier} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="carrier" type="text" placeholder="Carrier" />
                                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contactName">
                                        Contact Name
                                    </label>
                                    <input onChange={handleChange} name='contactName' value={contactName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="contactName" type="text" placeholder="Contact Name" />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="salesCommission">
                                        Sales Commission
                                    </label>
                                    <input onChange={handleChange} name='salesCommission' value={salesCommission} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="salesCommission" type="text" placeholder="Sales Commission" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
                                        Status
                                    </label>
                                    <div className="relative">
                                        <select onChange={handleChange} name='status' value={status} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="status">
                                            <option value={"Created"}>Created</option>
                                            <option value={"Approved"}>Approved</option>
                                            <option value={"Delivered"}>Delivered</option>
                                            <option value={"Cancelled"}>Cancelled</option>


                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>





                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="accName">
                                        Account Name
                                    </label>
                                    <input onChange={handleChange} name='accName' value={accName} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="accName" type="text" placeholder="Account Name" />
                                </div>


                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dueDate">
                                        create Date
                                    </label>
                                    <input onChange={handleChange} name='createDate' value={createDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="createDate" type="date" />
                                </div>

                            </div>
                        </form>
                    </div>



                    <div>
                        <form className="w-full max-w-lg mx-auto mt-10">
                            <div className="flex flex-wrap -mx-3 mb-6">

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="billingStreet">
                                        Billing Street
                                    </label>
                                    <input onChange={handleChange} name='billingStreet' value={billingStreet} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="billingStreet" type="text" placeholder="Billing Street" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="billingCity">
                                        Billing City
                                    </label>
                                    <input onChange={handleChange} name='billingCity' value={billingCity} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="billingCity" type="text" placeholder="Billing City" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="billingState">
                                        Billing State
                                    </label>
                                    <input onChange={handleChange} name='billingState' value={billingState} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="billingState" type="text" placeholder="Billing State" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="billingCode">
                                        Billing Code
                                    </label>
                                    <input onChange={handleChange} name='billingCode' value={billingCode} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="billingCode" type="text" placeholder="Billing Code" />
                                </div>

                            </div>

                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="billingCountry">
                                        Billing Country
                                    </label>
                                    <input onChange={handleChange} name='billingCountry' value={billingCountry} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="billingCountry" type="text" placeholder="Billing Country" />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-3 mt-6">

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shippingStreet">
                                        Shipping Street
                                    </label>
                                    <input onChange={handleChange} name='shippingStreet' value={shippingStreet} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="shippingStreet" type="text" placeholder="Shipping Street" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shippingCity">
                                        Shipping City
                                    </label>
                                    <input onChange={handleChange} name='shippingCity' value={shippingCity} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="shippingCity" type="text" placeholder="Shipping City" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shippingState">
                                        Shipping State
                                    </label>
                                    <input onChange={handleChange} name='shippingState' value={shippingState} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="shippingState" type="text" placeholder="Shipping State" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shippingCode">
                                        Shipping Code
                                    </label>
                                    <input onChange={handleChange} name='shippingCode' value={shippingCode} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="shippingCode" type="text" placeholder="Shipping Code" />
                                </div>

                            </div>

                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="shippingCountry">
                                        Shipping Country
                                    </label>
                                    <input onChange={handleChange} name='shippingCountry' value={shippingCountry} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="shippingCountry" type="text" placeholder="Shipping Country" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>





            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tax
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Discount
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Operation
                            </th>
                        </tr>
                    </thead>
                    {Array.isArray(rows) && rows.map((row, index) => (<tbody key={index}>
                        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                {index + 1}
                            </th>


                            <td  className="px-6 py-4 relative">
                                <select
                                    type="text"
                                    value={row.prodName}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500 w-40"
                                    
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].prodName = e.target.value;
                                        setRows(updatedRows);
                                        fetchData(updatedRows[index].prodName, index)

                                    }}

                                    id='type'
                                >
                                    <option value={''}></option>
                                    {products.filter(item=>item.author===registration).map((item) => (
                                        <option key={item._id} value={item.productName} defaultValue={row.prodName === item.productName}>{item.productName}</option>))}





                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-16 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M3.832 8.116a.5.5 0 01.707 0L10 13.293l5.46-5.461a.5.5 0 01.707.707l-5.748 5.748a1.5 1.5 0 01-2.121 0L3.125 8.823a.5.5 0 010-.707z" clipRule="evenodd" /></svg>
                                </div>

                                <div onBlur={fetchProducts} className='absolute -mt-1'><PopupFormProduct companies={companies} /></div>


                            </td>
                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={row.qty}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500 w-24"

                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].qty = e.target.value;
                                        setRows(updatedRows);
                                        checkQuantity(updatedRows[index].prodName, updatedRows[index].qty)
                                        updatedRows[index].price = (selectedProducts[index]?.unitPrice ?? '');
                                        updatedRows[index].amount = (selectedProducts[index]?.unitPrice ?? '') * row.qty;
                                        updatedRows[index].tax = (selectedProducts[index]?.tax);
                                        updatedRows[index].total = ((selectedProducts[index]?.unitPrice ?? 0) * row.qty) + (((selectedProducts[index]?.unitPrice ?? 0) * row.qty) * ((selectedProducts[index]?.tax ?? 0) / 100));
                                        calculateSubTotal()
                                        calculateTotal()
                                        calculateTax()

                                    }}
                                />
                            </td>



                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={selectedProducts[index]?.unitPrice ?? ''}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500 w-24"
                                    readOnly
                                />
                            </td>

                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={(selectedProducts[index]?.unitPrice ?? '') * row.qty}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500 w-24"
                                    readOnly
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={selectedProducts[index]?.tax}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500 w-24"
                                    readOnly
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={row.discount}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500 w-24"
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].discount = e.target.value;
                                        updatedRows[index].total = (((selectedProducts[index]?.unitPrice ?? 0) * row.qty) + (((selectedProducts[index]?.unitPrice ?? 0) * row.qty) * ((selectedProducts[index]?.tax ?? 0) / 100))) - (((((selectedProducts[index]?.unitPrice ?? 0) * row.qty) + (((selectedProducts[index]?.unitPrice ?? 0) * row.qty) * ((selectedProducts[index]?.tax ?? 0) / 100))) * ((row.discount ?? 0))) / 100);
                                        setRows(updatedRows);
                                        calculateDiscount()
                                        calculateTotal()

                                    }}
                                    maxLength={2}
                                />
                            </td>

                            <td className="px-6 py-4">
                                <input
                                    type="text"
                                    value={(((selectedProducts[index]?.unitPrice ?? 0) * row.qty) + (((selectedProducts[index]?.unitPrice ?? 0) * row.qty) * ((selectedProducts[index]?.tax ?? 0) / 100))) - (((((selectedProducts[index]?.unitPrice ?? 0) * row.qty) + (((selectedProducts[index]?.unitPrice ?? 0) * row.qty) * ((selectedProducts[index]?.tax ?? 0) / 100))) * ((row.discount ?? 0))) / 100)}


                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500 w-28"
                                    readOnly
                                />
                            </td>
                            <td className="px-6 py-4" onClick={() => handleRemoveRow(index)}>
                                <a href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</a>
                            </td>
                        </tr>

                    </tbody>))}

                </table>



            </div>
            <button onClick={handleAddRow} className='flex items-center justify-center bg-blue-600 px-5 py-2 border rounded-xl ml-4 mt-2'>Add Row</button>

            <div>
                <form className="w-full max-w-md ml-auto mt-10">
                    <div className="flex flex-col -mx-3 mb-6">

                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="subTotal">
                                Sub Total
                            </label>
                            <input onChange={handleChange} name='subTotal' value={subTotal} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="subTotal" type="text" placeholder="Sub Total" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="totalDiscount">
                                Total Discount
                            </label>
                            <input onChange={handleChange} name='totalDiscount' value={totalDiscount} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="totalDiscount" type="text" placeholder="Total Discount" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="totalTax">
                                Total Tax
                            </label>
                            <input onChange={handleChange} name='totalTax' value={totalTax} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="totalTax" type="text" placeholder="Total Tax" />

                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grandTotal">
                                Grand Total
                            </label>
                            <input onChange={handleChange} name='grandTotal' value={grandTotal} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grandTotal" type="text" placeholder="Grand Total" />


                        </div>
                    </div>
                </form>
            </div>

        </section>
    )
}

export default createSales





export async function getServerSideProps(context) {
    try {
        await connectDB();

        const companies = await Company.find({}, { updatedAt: 0 }).lean();
        const products = await ProductList.find({}, { updatedAt: 0 }).lean();

        return {
            props: {
                companies: companies.map((company) => ({
                    ...company,
                    _id: (company._id) ? ((JSON.stringify(company._id)).slice(1, -1)) : '',

                    author: (company.author) ? ((JSON.stringify(company.author)).slice(1, -1)) : '',
                    createdAt: company.createdAt.toISOString(),
                })),
                products: products.map((item) => ({
                    ...item,
                    _id: (item._id) ? ((JSON.stringify(item._id)).slice(1, -1)) : '',
                    author: (item.author) ? ((JSON.stringify(item.author)).slice(1, -1)) : '',
                    createdAt: item.createdAt.toISOString(),

                })),
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: { companies: [], products: [] },
        };
    }
}