import React, { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import {FiLogIn} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import api from '../../services/api'
import axios from 'axios'
import './styles.css'

interface User {
    id: string,
    name: string,
    email: string,
    birthDate: string,
    rg: string,
    cpf: string
}
interface Pagination{
    totalPages: number,
    nextPageUrl: string,
}

interface Pages {
    pag: object,
    page: string,
    pageUrl: string
}


const Home = () =>{

    //const [items, setItems] = useState<Item[]>([]) ts
    const [users, setUsers] = useState<User[]>([])
    const [pagination, setPagination] = useState<Pagination[]>([])
    const [pages, setPages] = useState<Pages[]>([])

    useEffect(() => {
        api.get('users').then(res => {
            setUsers(res.data.users)
            setPages(res.data.pag.pages)
        })
    }, [])
    
    /* useEffect(() => {
        api.get('users').then(res => {
            setPagination(res.data.pag)
        })
    }, [])

    useEffect(() => {
        api.get<Pages[]>('users').then(res => {
            setPages(res.data.pag.pages)
        })
    }, []) */

    
   
       return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="E Coleta"/>
                </header>
               <main>
               <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Nome</th>
                                <th scope="col">email</th>
                                <th scope="col">Dt nascimento</th>
                                <th scope="col">RG</th>
                                <th scope="col">CPF</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.birthDate}</td>
                                <td>{user.rg}</td>
                                <td>{user.cpf}</td>
                            </tr>
                        )
                        )
                        }
                            
                        </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                                {
                                    pages.map(pag =>(
                                    <li key={pag.pageUrl} className="page-item"><a className="page-link" href={pag.pageUrl}>{pag.page}</a></li>
                                    ))
                                }
                                <li className="page-item"><a className="page-link" href="">Next</a></li>
                            </ul>
                        </nav>

                   <Link to="/create-point" className="btn btn-success">
                       <span>
                            <FiLogIn />
                       </span>
                       <strong>Cadastre um ponto de coleta</strong>
                    </Link>
               </main> 
                
            </div>
        </div>
    )
}

export default Home