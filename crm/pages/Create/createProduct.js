import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import Company from "@/Models/createCompany";
import connectDB from '@/Middleware/db';


const createProduct = () => {
    const [imageName, setImageName] = useState(null);
    const [productInfo, setProductInfo] = useState("")
    const [productOwner, setProductOwner] = useState("")
    const [productCode, setProductCode] = useState("")
    const [productName, setProductName] = useState("")
    const [vendorName, setVendorName] = useState("")
    const [productActive, setProductActive] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [category, setCategory] = useState("")
    const [salesStartDate, setSalesStartDate] = useState("")
    const [salesEndDate, setSalesEndDate] = useState("")
    const [supportStartDate, setSupportStartDate] = useState("")
    const [supportEndDate, setSupportEndDate] = useState("")
    const [unitPrice, setUnitPrice] = useState("")
    const [tax, setTax] = useState("")
    const [taxable, setTaxable] = useState("")
    const [qty, setQty] = useState("")
    const [unit, setUnit] = useState("")
    const [description, setDescription] = useState("")
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



    const handleChange = (e) => {
        if (e.target.name == 'imageName') {
            setImageName(e.target.value)
        }
        if (e.target.name == 'productInfo') {
            setProductInfo(e.target.value)
        }
        if (e.target.name == 'productOwner') {
            setProductOwner(e.target.value)
        }
        if (e.target.name == 'productCode') {
            setProductCode(e.target.value)
        }
        if (e.target.name == 'productName') {
            setProductName(e.target.value)
        }
        if (e.target.name == 'vendorName') {
            setVendorName(e.target.value)
        }
        if (e.target.name == 'productActive') {
            setProductActive(e.target.value)
        }
        if (e.target.name == 'manufacturer') {
            setManufacturer(e.target.value)
        }
        if (e.target.name == 'category') {
            setCategory(e.target.value)
        }
        if (e.target.name == 'salesStartDate') {
            setSalesStartDate(e.target.value)
        }
        if (e.target.name == 'salesEndDate') {
            setSalesEndDate(e.target.value)
        }
        if (e.target.name == 'supportStartDate') {
            setSupportStartDate(e.target.value)
        }
        if (e.target.name == 'supportEndDate') {
            setSupportEndDate(e.target.value)
        }
        if (e.target.name == 'unitPrice') {
            setUnitPrice(e.target.value)
        }
        if (e.target.name == 'tax') {
            setTax(e.target.value)
        }
        if (e.target.name == 'taxable') {
            setTaxable(e.target.value)
        }
        if (e.target.name == 'qty') {
            setQty(e.target.value)
        }
        if (e.target.name == 'unit') {
            setUnit(e.target.value)
        }
        if (e.target.name == 'description') {
            setDescription(e.target.value)
        }

    }

    const ProductCreate = async () => {
        try {

            const data = { imageName, productInfo, productOwner, productCode, productName, vendorName, productActive, manufacturer, category, salesStartDate, salesEndDate, supportStartDate, supportEndDate, unitPrice, tax, taxable, qty, unit, description, author:registration };

            let CreateContact = await fetch(`/api/Create/productListCreate`, {
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
            setImageName("")
            setProductInfo("")
            setProductOwner("")
            setProductCode("")
            setProductName("")
            setVendorName("")
            setProductActive("")
            setManufacturer("")
            setCategory("")
            setSalesStartDate("")
            setSalesEndDate("")
            setSupportStartDate("")
            setSupportEndDate("")
            setUnitPrice("")
            setTax("")
            setTaxable("")
            setQty("")
            setUnit("")
            setDescription("")




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
                <button onClick={ProductCreate} className='px-5 py-2 mt-6 bg-blue-600 text-sm lg:text-base text-white rounded-[4px] shadow-md'>Create Product</button>
            </div>
            <h4 className='text-black font-extrabold text-xl text-center mt-4'>Create Product</h4>

            <div className='container mx-auto'>
                <div className='overflow-x-auto grid lg:grid-cols-2 mt-16'>



                    <div>
                        <form className="w-full max-w-lg mx-auto mt-8">
                            <div className="mb-4">
                                
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="imageName">
                                    Image URL :
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="image-container"
                                    type="text"
                                    name='imageName'
                                    onChange={handleChange}
                                    value={imageName}
                                />
                                {/* <div className="mt-2">
                                    {imageName && (
                                        <div className="flex items-center">
                                            <p className="text-gray-600 text-xs italic mr-2">{imageName}</p>
                                            {
                                                imagePreview ? (
                                                    <Image width={300} height={350} src={imagePreview} className="h-10 w-10 object-cover rounded-full" alt="" />
                                                ) : null
                                            }
                                        </div>
                                    )}
                                </div> */}
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productInfo">
                                        Product Information
                                    </label>
                                    <input onChange={handleChange} name='productInfo' value={productInfo} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="productInfo" type="text" placeholder="Product Information" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productOwner">
                                        Product Owner
                                    </label>
                                    <input onChange={handleChange} name='productOwner' value={productOwner} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="productOwner" type="text" placeholder="Product Owner" />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productCode">
                                        Product Code
                                    </label>
                                    <input onChange={handleChange} name='productCode' value={productCode} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="productCode" type="text" placeholder="Product Code" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productName">
                                        Product Name
                                    </label>
                                    <input onChange={handleChange} name='productName' value={productName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="productName" type="text" placeholder="Product Name" />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="vendorName">
                                        Vendor Name
                                    </label>
                                    <input onChange={handleChange} name='vendorName' value={vendorName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="productName" type="text" placeholder="Vendor Name" />
                                </div>
                                

                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productActive">
                                        Product Active
                                    </label>
                                    <input onChange={handleChange} name='productActive' value={productActive} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="name" type="text" placeholder="Product Active" />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="manufacturer">
                                    Manufacturer
                                    </label>
                                    <input onChange={handleChange} name='manufacturer' value={manufacturer} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="manufacturer" type="text" placeholder="Manufacturer" />
                                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                                        Category
                                    </label>
                                    <input onChange={handleChange} name='category' value={category} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Phone" type="text" placeholder="Category" />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="salesStartDate">
                                        Sales Start Date
                                    </label>
                                    <input onChange={handleChange} name='salesStartDate' value={salesStartDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="salesStartDate" type="date" placeholder="Sales Start Date" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="salesEndDate">
                                    Sales End Date
                                    </label>
                                    <input onChange={handleChange} name='salesEndDate' value={salesEndDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="salesEndDate" type="date" placeholder="Sales End Date" />
                                   
                                    </div>
                                </div>





                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="supportStartDate">
                                        Support Start Date
                                    </label>
                                    <input onChange={handleChange} name='supportStartDate' value={supportStartDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="supportStartDate" type="date" placeholder="Support Start Date" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="supportEndDate">
                                        Support End Date
                                    </label>
                                    <input onChange={handleChange} name='supportEndDate' value={supportEndDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="supportEndDate" type="date" placeholder="Support End Date" />
                                </div>
                            </div>
                        </form>
                    </div>



                    <div>
                        <form className="w-full max-w-lg mx-auto mt-10">
                            <div className="flex flex-wrap -mx-3 mb-6">

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="unitPrice">
                                        Unit Price
                                    </label>
                                    <input onChange={handleChange} name='unitPrice' value={unitPrice} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="unitPrice" type="text" placeholder="Unit Price in Rs" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tax">
                                        Tax
                                    </label>
                                    <input onChange={handleChange} name='tax' value={tax} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="tax" type="text" placeholder="Tax" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="taxable">
                                        Taxable
                                    </label>
                                    <input onChange={handleChange} name='taxable' value={taxable} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="taxable" type="text" placeholder="Taxable" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="qty">
                                    Quantity
                                    </label>
                                    <input onChange={handleChange} name='qty' value={qty} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 contacting-tight focus:outline-none focus:bg-white focus:border-gray-500" id="qty" type="text" placeholder="Quantity" />
                                </div>
                               
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="unit">
                                        Usage Unit
                                    </label>
                                    <div className="relative">
                                        <select onChange={handleChange} name='unit' value={unit} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="unit">
                                            <option value={""} ></option>
                                            <option value={"Box"}>Box</option>
                                            <option value={"Carton"}>Carton</option>
                                            <option value={"Dozen"}>Dozen</option>
                                            <option value={"Each"}>Each</option>
                                            <option value={"Hours"}>Hours</option>
                                            <option value={"Pack"}>Pack</option>
                                            <option value={"Pages"}>Pages</option>
                                            <option value={"Pieces"}>Pieces</option>
                                            <option value={"Qty"}>Qty</option>
                                            <option value={"Sheet"}>Sheet</option>
                                            <option value={"Sq.ft"}>Sq.ft</option>

                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>

                                    <textarea id="story" onChange={handleChange} name="description" value={description} rows="4" className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none'>
                                    </textarea>
                                </div>
                            </div>
                               


                        </form>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default createProduct


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