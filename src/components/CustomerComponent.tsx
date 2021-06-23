import { ChangeEvent, useState } from "react";
import { Customer } from "../models/customer";
import { useCustomerService } from "../services/CustomerService";

interface CustomerProps {
    display: boolean;
    isUpdate: boolean;
    data?: Customer;
    close: () => any;
}

export const CustomerComponent: React.FC<CustomerProps> = (props) => {

    const [model, setModel] = useState<Customer | null | undefined>(props.data);

    //const [display, setDisplay] = useState<boolean>(props.display);
    console.log(props.display)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        let md = { ...model }
        md[name] = value;
        setModel(md);
    }

    const customerService = useCustomerService();


    const save = async (e: any) => {
        e.preventDefault();
        customerService.save(model)
            .then(resp => {
                props.close();
                setModel(null);
            })
    }
    const update = (e: any) => {
        e.preventDefault();
        customerService.update(model)
            .then(resp => {
                props.close();
                setModel(null);
            })
    }

    return (
        // className={props.display ? 'modal-shown' : 'modal'}
        <div className={'fixed z-10 inset-0 overflow-y-auto '} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full p-12">
                    <form className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                    Name
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="name" type="text" placeholder="Customer Name"
                                    value={model?.name || ''} onChange={handleChange} />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                    Surname
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Customer Surname" name="surname"
                                    value={model?.surname || ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                                    Phone Number
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone" name="phone" type="text" placeholder="Customer Phone"
                                    value={model?.phone || ''} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="items-end text-right">
                            <button onClick={(event) => { event.preventDefault(); props.close(); setModel(null); }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Close
                            </button>
                            <button onClick={props.isUpdate ? update : save} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                Save
                            </button>
                        </div>
                    </form>
                    {/* <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setDisplay(false)}>
                            Cancel
                        </button>
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={props.isUpdate ? update : save}>
                            Save
                        </button>
                    </div> */}
                </div>
            </div>
        </div >
        // <div className={props.display ? 'modal-shown' : 'modal'}>
        //     <form className="w-full max-w-lg">
        //         <div className="flex flex-wrap -mx-3 mb-6">
        //             <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        //                 <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        //                     Adı
        //                 </label>
        //                 <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" name="name" type="text" placeholder="Müşteri Adı"
        //                     value={model?.name || ''} onChange={handleChange} />
        //             </div>
        //             <div className="w-full md:w-1/2 px-3">
        //                 <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        //                     Soyadı
        //                 </label>
        //                 <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Müşteri Soyadı" name="surname"
        //                     value={model?.surname || ''} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="flex flex-wrap -mx-3 mb-6">
        //             <div className="w-full px-3">
        //                 <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
        //                     Telefon Numarası
        //                 </label>
        //                 <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-phone" name="phone" type="text" placeholder="Müşteri Telefon Numarası"
        //                     value={model?.phone || ''} onChange={handleChange} />
        //             </div>
        //         </div>
        //         <div className="items-end text-right">
        //             <button onClick={() => setDisplay(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
        //                 Close
        //             </button>
        //             <button onClick={props.isUpdate ? update : save} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        //                 Save
        //             </button>
        //         </div>
        //     </form>
        // </div>
    );

}