import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { Customer } from "../models/customer";
import { useCustomerService } from "../services/CustomerService";
import { CustomerComponent } from "./CustomerComponent";

export const Customers = () => {
    const thClassName = "py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light";
    const tdClassName = "py-4 px-6 border-b border-grey-light";
    const customerService = useCustomerService();

    const [customers, setCustomers] = useState<Customer[]>();

    const [display, setDisplay] = useState<boolean>(false);

    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        getAll();
    }, [])

    const getAll = async () => {
        await customerService.getAll()
            .then(resp => {
                setCustomers(resp.data);
            })
    }


    const remove = async (customerId: number) => {
        await customerService.remove(customerId)
            .then(resp => {
                console.log("Silindi");
                getAll();
            })
    }

    const edit = (customer: Customer) => {
        setCustomer(customer);
        setIsUpdate(true);
        setDisplay(true);
    }

    const close = () => {
        console.log("hello")
        setDisplay(false);
        getAll();
        setCustomer(undefined);
    }


    return (
        <div>
            <div className="items-end justify-self-end right-0 text-right">
                <button onClick={() => { setIsUpdate(false); setDisplay(true); }} className="bg-green-400 hover:bg-green-600 text-white py-2 px-4 rounded mr-2">
                    Add
                </button>
                <button onClick={() => getAll()} className="bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Refresh
                </button>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th className={thClassName}>Id</th>
                        <th className={thClassName}>Name</th>
                        <th className={thClassName}>Surname</th>
                        <th className={thClassName}>Phone Number</th>
                        <th className={thClassName}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers?.map((customer, index) => {
                            return (
                                <tr key={index} className="hover:bg-grey-lighter">
                                    <td className={tdClassName}>{customer.id}</td>
                                    <td className={tdClassName}>{customer.name}</td>
                                    <td className={tdClassName}>{customer.surname}</td>
                                    <td className={tdClassName}>{customer.phone}</td>
                                    <td className={tdClassName}>
                                        <button onClick={() => { edit(customer); }} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mr-1">
                                            Edit
                                        </button>
                                        <button onClick={() => remove(customer.id!)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>


            </table>
            <Modal
                isOpen={display}
                onRequestClose={close}
            >
                <CustomerComponent display={display} isUpdate={isUpdate} data={customer} close={close}></CustomerComponent>
            </Modal>
        </div>
    );
}