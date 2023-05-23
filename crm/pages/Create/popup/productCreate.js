import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import Company from "@/Models/createCompany";
import connectDB from '@/Middleware/db';


export default function PopupFormProduct({ companies }) {
    console.log(companies)
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const router = useRouter()
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


    const [imageName, setImageName] = useState(null);
    const [productInfo, setProductInfo] = useState("")
    const [productOwner, setProductOwner] = useState('')
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
    const handleSubmit = async () => {
        try {
    let companyDetails = companies.filter(author => author.author === registration).map(item=>item.ownerName)

 

            const data = { imageName, productInfo, productOwner: companyDetails[0], productCode, productName, vendorName, productActive, manufacturer, category, salesStartDate, salesEndDate, supportStartDate, supportEndDate, unitPrice, tax, taxable, qty, unit, description, author: registration };
            
if(products.filter(item => item.author === registration).map(item => item.productName).includes(data.productName)){
    toast.error("Product Name Exist", {
        position: "top-center",
        autoClose: 1100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}else{

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
            }
            
            
            
            
            
        }
        } catch (err) {
            console.error(err)
        }
    };
    
    return (
        <div>
            <button onClick={togglePopup}>Create Product</button>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close flex justify-end font-bold text-xl text-black" onClick={togglePopup}>
                            <div className='border px-2 border-black rounded-full '>

                        X
                            </div>
                        </span>
                        <h2 className='flex justify-center items-center py-2 -mt-2 font-extrabold text-lg text-bla
                        '>Quick Create Product</h2>
                        <form >
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-2" htmlFor="productName">
                                Product Name
                            </label>
                            <input onFocus={fetchProducts} onChange={handleChange} name='productName' value={productName} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="productName" type="text" placeholder="Product Name" />

                            <div className='flex flex-wrap -mx-3'>


                                <div className='w-full md:w-1/2 px-3 '>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-2" htmlFor="unitPrice">
                                        Unit Price
                                    </label>
                                    <input onChange={handleChange} name='unitPrice' value={unitPrice} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="unitPrice" type="text" placeholder="Unit Price" />

                                </div>
                                <div className='w-full md:w-1/2 px-3'>


                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1 mt-2" htmlFor="qty">
                                        Total Quantity
                                    </label>
                                    <input onChange={handleChange} name='qty' value={qty} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 contacting-tight focus:outline-none focus:bg-white" id="qty" type="text" placeholder="Quantity" />

                                </div>
                            </div>

                            <div className='flex flex-wrap -mx-3 mb-6'>


                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tax">
                                        Tax
                                    </label>


                                    <div className="relative">
                                        <select onChange={handleChange} name='tax'
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded contacting-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            value={tax}
                                            id='tax'
                                        >

                                            <option value={'0'}>0%</option>
                                            <option value={'5'}>5%</option>
                                            <option value={'12'}>12%</option>
                                            <option value={'18'}>18%</option>
                                            <option value={'28'}>28%</option>

                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M3.832 8.116a.5.5 0 01.707 0L10 13.293l5.46-5.461a.5.5 0 01.707.707l-5.748 5.748a1.5 1.5 0 01-2.121 0L3.125 8.823a.5.5 0 010-.707z" clipRule="evenodd" /></svg>
                                        </div>
                                    </div>

                                </div>


                                <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>


</div>
                          
                            </div>


                        </form>
                        <div className='flex justify-center items-center'>
                        <button onClick={handleSubmit} className='bg-blue-600 px-4 py-2 text-white '>Submit</button>

                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
        .popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .popup-content {
          background-color: #fff;
          padding: 20px;
          max-width: 400px;
          width: 100%;
        }

      
      `}</style>
        </div>
    );


};



export async function getServerSideProps(context) {
    try {
        await connectDB();

        const companies = await Company.find({}, { _id: 0, updatedAt: 0 }).lean();

        return {
            props: {
                companies: companies.map((company) => ({
                    ...company,
                    author: (company.author) ? ((JSON.stringify(company.author)).slice(1, -1)) : '',
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
