import React,{useState} from "react";
import Layout from "../../components/layouts";
import './style.css';   
export default function Login() {
    const [email,setEmail] = useState('');
    const [password , setPassword] = useState('');

  return (
    <Layout>
      <form className = 'login-form container'>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email : </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name = "email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password :</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name = "password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
        </div> 
        <button type="submit" className="btn btn-primary">
          Đăng Nhập
        </button>
      </form>
    </Layout>
  );
}
