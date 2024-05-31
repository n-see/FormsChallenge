import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().email("Enter username"),
  password: z.string().min(8, 'Password must be 8 characters long')
})

type FormData = z.infer<typeof schema>;

const LogIn = () => {

  const [fail, setFail] = useState(false);

  const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)})
  console.log(errors)

  const onHelpSubmit =(data:FieldValues) => {
      console.log(data);
  }
  const handleFail = () => {
    setFail(!fail)
  }

  return (
    <>
        <h1 className="text-center">Log In</h1>
        
            <div className="myContainer">
                <div className="row justify-content-center">
                  <div className="col-6 loginCard">
                  <form onSubmit={handleSubmit(onHelpSubmit)}>
                  {fail ? <p className='text-danger'> Incorrect username or password </p> : null}
                    <label htmlFor="" className="form-label">Username</label>
                    <input {...register("username")} id='username' type="email" className="form-control" />
                    {errors.username && <p className='text-danger'>{errors.username.message}</p>}

                    <label htmlFor="" className="form-label">Password</label>
                    <input {...register('password')}  id='password' type="password" className="form-control" />
                    {errors.password && <p className='text-danger'>{errors.password.message}</p>}


                    <div>
                    <button className="btn btn-primary mt-5 mb-3" onClick={handleFail}>Submit</button>
                    </div>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" >Forgot Password</a>
                </form>
                  </div>
                
                </div>
            </div>
            
        

    </>
  )
}

export default LogIn