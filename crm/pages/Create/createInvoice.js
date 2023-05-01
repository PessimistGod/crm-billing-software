import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import Company from "@/Models/createCompany";
import connectDB from '@/Middleware/db';


const createSales = () => {
    const [invoiceOwner, setInvoiceOwner] = useState(null);
    const [salesOrder, setSalesOrder] = useState("")
    const [subject, setSubject] = useState("")
    const [purchaseOrder, setPurchaseOrder] = useState("")
    const [customerNumber, setCustomerNumber] = useState("")
    const [invoiceDate, setInvoiceDate] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [contactName, setContactName] = useState("")
    const [salesCommission, setSalesCommission] = useState("")
    const [status, setStatus] = useState("")
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

    const handleChange = (e) => {
        if (e.target.name == 'invoiceOwner') {
            setInvoiceOwner(e.target.value)
        }
        if (e.target.name == 'salesOrder') {
            setSalesOrder(e.target.value)
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
        if (e.target.name == 'invoiceDate') {
            setInvoiceDate(e.target.value)
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

        if (e.target.name == 'totalDiscount') {
            setTotalDiscount(e.target.value)
        }
        if (e.target.name == 'totalTax') {
            setTotalTax(e.target.value)
        }
        if (e.target.name == 'grandTotal') {
            setGrandTotal(e.target.value)
        }
        if (e.target.name == 'subTotal') {
            setSubTotal(e.target.value)
        }
    }

        const subTotals = rows.reduce((total, row) => {
            const itemTotal = (row.price * row.qty);
            return total + itemTotal;
        }, 0);


        const grandTotals = rows.reduce((total, row) => {
            const itemTotal = (row.price * row.qty) + ((row.price * row.qty) * (row.tax/100)) - row.discount;
            return total + itemTotal;
        }, 0);

        const grandDiscount = rows.reduce((total, row) => {
            const itemTotal = Number.parseInt(row.discount);
            if(itemTotal === 'NaN'){
                return 0
            }
            return total + itemTotal;
        }, 0);
          
    
    const InvoiceCreate = async () => {
        try {

            const data = { invoiceOwner, salesOrder, subject, purchaseOrder, customerNumber, dueDate, invoiceDate, contactName, salesCommission, status, accName, billingStreet, shippingStreet, billingCity, billingState, billingCode, billingCountry, shippingCity, shippingState, shippingCode, shippingCountry, subTotal, totalDiscount, totalTax, grandTotal, rows, author:registration };

            let CreateContact = await fetch(`/api/Create/salesCreate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            console.log(data)
            let response = await CreateContact.json()
            console.log(response)
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
            }
            setInvoiceOwner("")
            setSalesOrder("")
            setSubject("")
            setPurchaseOrder("")
            setCustomerNumber("")
            setDueDate("")
            setInvoiceDate("")
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








        } catch (err) {
            console.error(err)
        }


    }

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
                <button onClick={InvoiceCreate} className='px-5 py-2 mt-6 bg-blue-600 text-sm lg:text-base text-white rounded-[4px] shadow-md'>Create Invoice</button>
            </div>
            <h4 className='text-black font-extrabold text-xl text-center mt-4'>Create Invoice</h4>

            <div className='container mx-auto'>
                <div className='overflow-x-auto grid lg:grid-cols-2 mt-16'>



                    <div>
                        <form className="w-full max-w-lg mx-auto mt-8">

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="invoiceOwner">
                                        Invoice Owner
                                    </label>
                                    <input onChange={handleChange} name='invoiceOwner' value={invoiceOwner} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="invoiceOwner" type="text" placeholder="Invoice Owner" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="salesOrder">
                                        Sales Order
                                    </label>
                                    <input onChange={handleChange} name='salesOrder' value={salesOrder} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="salesOrder" type="text" placeholder="Sales Order" />
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

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="invoiceDate">
                                        Invoice Date
                                    </label>
                                    <input onChange={handleChange} name='invoiceDate' value={invoiceDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="invoiceDate" type="date" placeholder="Invoice Date" />
                                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                </div>

                            </div>


                            <div className="flex flex-wrap -mx-3 mb-6">


                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dueDate">
                                        Due Date
                                    </label>
                                    <input onChange={handleChange} name='dueDate' value={dueDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="dueDate" type="date" />
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
                                            <option value={""} ></option>
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

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white uppercase bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-2 py-3">
                                S.No
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tax in %
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Discount
                            </th>

                            <th scope="col" class="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Operation
                            </th>
                        </tr>
                    </thead>
                    {Array.isArray(rows) && rows.map((row, index) => (<tbody key={index}>

                        <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <th scope="row" class="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                {index + 1}
                            </th>
                            <td class="px-6 py-4">
                                <input
                                    type="text"
                                    value={row.prodName}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].prodName = e.target.value;
                                        setRows(updatedRows);
                                    }}
                                />
                            </td>
                            <td class="px-6 py-4">
                                <input
                                    type="text"
                                    value={row.qty}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].qty = e.target.value;
                                        setRows(updatedRows);
                                    }}
                                />
                            </td>
                            <td class="px-6 py-4">
                                <input
                                    type="text"
                                    value={row.price}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].price = e.target.value;
                                        setRows(updatedRows);
                                    }}
                                />
                            </td>

                            <td class="px-6 py-4">
                                <input
                                    type="text"
                                    value={row.price * row.qty}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].amount = e.target.value;
                                        setRows(updatedRows);
                                    }}
                                />
                            </td>

                            <td class="px-6 py-4">
                                <input
                                    type="text"
                                    value={row.tax}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].tax = e.target.value;
                                        setRows(updatedRows);
                                    }}
                                />
                            </td>
                            <td class="px-6 py-4">
                                <input
                                    type="text"
                                    value={row.discount}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].discount = e.target.value;
                                        setRows(updatedRows);
                                    }}
                                />
                            </td>
                            <td class="px-6 py-4">
                                <input
                                    type="text"
                                    value={((row.price * row.qty) + ((row.price * row.qty) * (row.tax / 100))) - row.discount}
                                    className="appearance-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    onChange={(e) => {
                                        const updatedRows = [...rows];
                                        updatedRows[index].total = e.target.value;
                                        setRows(updatedRows);
                                    }}
                                />
                            </td>
                            <td class="px-6 py-4" onClick={() => handleRemoveRow(index)}>
                                <a href="#" class="font-medium text-red-600 dark:text-blue-500 hover:underline">Delete</a>
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




                            <input onChange={handleChange} name='subTotal' value={subTotals} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="subTotal" type="text" placeholder="Sub Total" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="totalDiscount">
                                Total Discount
                            </label>
                            <input onChange={handleChange} name='totalDiscount' value={grandDiscount} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="totalDiscount" type="text" placeholder="Total Discount" />
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
                            <input onChange={handleChange} name='grandTotal' value={grandTotals} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grandTotal" type="text" placeholder="Grand Total" />

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
  
      const companies = await Company.find({}, { _id: 0, updatedAt: 0 }).lean();
  
      return {
        props: {
            companies: companies.map((company) => ({
            ...company,
            author: (company.author) ? ((JSON.stringify(company.author)).slice(1,-1)) : '',
            createdAt: company.createdAt.toISOString(),
          })),
      },
      };
    } catch (error) {
      console.log(error);
      return {
        props: { companies: [] },
      };
    }
  }