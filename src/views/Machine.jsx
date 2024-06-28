import React from 'react'
import { useLocation } from 'react-router-dom'
import Modal from './components/fragments/Modal'

const Machine = () => {
    const current = useLocation()
    return (
        <div>
            <TambahModal />
            <EditModal/>
            <DeleteModal/>
            <article className='p-10 flex items-center justify-between'>
                <h1 className='text-2xl font-extrabold text-primary'>3D Machine </h1>
                <button onClick={()=>document.getElementById("tambah").showModal()} className="btn btn-outline btn-primary">Tambah</button>
            </article>
            <article className='px-10'>
                <table className='table table-zebra'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>RFID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, number) => (
                            <tr>
                                <td>{number + 1}</td>
                                <td>{item.nama}</td>
                                <td>{item.rfid}</td>
                                <td className='flex gap-5'>
                                    <button onClick={()=> document.getElementById("delete").showModal()}  className='btn btn-error'>Hapus</button>
                                    <button onClick={()=> document.getElementById("edit").showModal()} className='btn btn-warning'>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </article>
        </div>
    )
}

const data = [
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
    {
        nama: "ASDNAKSDJ",
        rfid: "asdnjasd123123"
    },
]

const TambahModal = () => (
    <Modal id={"tambah"}>
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3>Tambah 3D Mesin</h3>
        <form action="" method="post" className='flex flex-col gap-3 mt-3'>
            <input type="text" name="name" id="name" className='input input-bordered w-full' placeholder='Nama mesin' />
            <input type="text" name="rfid" id="rfid" className='input input-bordered w-full' placeholder='RFID' />
            <button className='btn btn-primary col-span-2'>Submit</button>
        </form>
    </Modal>
)

const EditModal = () => (
    <Modal id={"edit"}>
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3>Edit 3D Mesin</h3>
        <form action="" method="post" className='flex flex-col gap-3 mt-3'>
            <input type="text" name="name" id="name" className='input input-bordered w-full' placeholder='Nama mesin' />
            <input type="text" name="rfid" id="rfid" className='input input-bordered w-full' placeholder='RFID' />
            <button className='btn btn-primary col-span-2'>Submit</button>
        </form>
    </Modal>
)

const DeleteModal = () => (
    <Modal id={"delete"}>
        <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3>Delete 3D Mesin</h3>
        <form action="" method="post" className='flex flex-col gap-3 mt-3'>
            <input type="text" name="name" id="name" className='input input-bordered w-full' placeholder='Nama mesin' />
            <input type="text" name="rfid" id="rfid" className='input input-bordered w-full' placeholder='RFID' />
            <button className='btn btn-primary col-span-2'>Submit</button>
        </form>
    </Modal>
)

export default Machine