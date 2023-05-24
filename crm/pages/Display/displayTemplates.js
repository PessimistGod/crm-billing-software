import { useRouter } from 'next/router'
import React from 'react'

const DisplayTemplate = () => {
    const router = useRouter();
    const { id } = router.query

    const templateSelect= async(value)=>{
        const response = await fetch(`/api/Update/approveSaleConvert?id=${id}&value=${value}`, { method: 'PUT' });
      const data = await response.json();
      if(data.success)
        router.push({
            pathname: `/templates/${value}`,
            query: { id: id }
          });
          
    }
  return (


<section class="text-gray-600 body-font">
  <div class="container ml-32">
    <div class="grid grid-cols-3">
      <div class="w-full">
        <a class="block relative h-96 w-1/2 rounded overflow-hidden">
          <img alt="Invoice" class="object-cover object-center w-full h-full object-scale-down block" onClick={(e)=>templateSelect(1)} src="/templates/template1.jpg" />
        </a>
      </div>

      <div class="w-full">
        <a class="block relative h-96 w-1/2 rounded overflow-hidden">
          <img alt="Invoice" class="object-cover object-center w-full h-full object-scale-down block" onClick={(e)=>templateSelect(2)} src="/templates/template2.jpg" />
        </a>
 
      </div>


      <div class="w-full">
        <a class="block relative h-96 w-1/2 rounded overflow-hidden">
          <img alt="Invoice" class="object-cover object-center w-full h-full object-scale-down block" onClick={(e)=>templateSelect(3)} src="/templates/template3.jpg" />
        </a>
 
      </div>


      <div class="w-full">
        <a class="block relative h-96 w-1/2 rounded overflow-hidden">
          <img alt="Invoice" class="object-cover object-center w-full h-full object-scale-down block" onClick={(e)=>templateSelect(4)} src="/templates/template4.jpg" />
        </a>
 
      </div>


      <div class="w-full">
        <a class="block relative h-96 w-1/2 rounded overflow-hidden">
          <img alt="Invoice" class="object-cover object-center w-full h-full object-scale-down block" onClick={(e)=>templateSelect(5)} src="/templates/template5.jpg" />
        </a>
 
      </div>


      <div class="w-full">
        <a class="block relative h-96 w-1/2 rounded overflow-hidden">
          <img alt="Invoice" class="object-cover object-center w-full h-full object-scale-down block" onClick={(e)=>templateSelect(6)} src="/templates/template6.jpg" />
        </a>
 
      </div>
     
    </div>
  </div>
</section>
  )
}

export default DisplayTemplate