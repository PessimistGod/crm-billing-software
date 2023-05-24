
import React, { useEffect, useState } from 'react';
import Sales from '@/Models/createSales';
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import SaveAsPDFButton from '@/Components/saveAsPdf';
import moment from 'moment'
import { HiMinus } from 'react-icons/hi';

const SalesInvoice = () => {
  return (
    <div></div>
  )
}

export default SalesInvoice




export async function getServerSideProps({ query }) {
    const { page = 1, startDate, endDate } = query;
    const perPage = 5;
  
    try {
      await connectDB();
  
      let sales;
      let totalFilteredSales;
      if (startDate && endDate) {
        sales = await Sales.find(
          {
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
          { updatedAt: 0 }
        )
          .lean()
          .sort({ createdAt: -1 });
  
        totalFilteredSales = sales.length;
      } else {
        sales = await Sales.find({}, { updatedAt: 0 }).lean().sort({ createdAt: -1 });
        totalFilteredSales = sales.length;
      }
  
      const totalPages = Math.ceil(totalFilteredSales / perPage);
  
      return {
        props: {
          sales: sales.map((sale) => ({
            ...sale,
            rows: sale.rows.map((item) => ({
              ...item,
              _id: String(item._id),
            })),
            _id: sale._id ? String(sale._id) : '',
            author: sale.author ? String(sale.author) : '',
            createdAt: sale.createdAt.toISOString(),
          })),
          totalPages,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: { sales: [], totalPages: 0 },
      };
    }
  }