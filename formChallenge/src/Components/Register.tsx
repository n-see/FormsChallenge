import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
    firstName: z.string().min(2,{message:"First Name is Required"}),
    lastName: z.string().min(2,{message:"Last Name is Required"}),
    email: z.string().email({message: 'Email is Required'}),
    password: z.string().min(8, {message: 'Password must contain 8 - 21 characters'}).max(21, {message: 'Password must be less than 21 characters'}),
    confirmPassword: z.string().min(8, {message: 'Password must contain 8 - 21 characters'}).max(21, {message: 'Password must be less than 21 characters'})
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

type FormData = z.infer<typeof schema>;

const Register = () => {
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)})
    console.log(errors)

    const onHelpSubmit =(data:FieldValues) => {
        console.log(data);
    }
    return (
        <>
            <h1 className="text-center">Register</h1>
            <form onSubmit={handleSubmit(onHelpSubmit)}>
                <div className="myContainer">
                        <div className="col-7 registerCard ">
                    <div className="row">
                            
                        <div className="col firstName">
                            <label htmlFor="" className="form-label">First Name</label>
                            <input {...register('firstName')} id="firstName" type="text" className="form-control" />
                            {errors.firstName && (<p className='text-danger'>{errors.firstName.message}</p>)}
                        </div>

                        <div className="col lastName">
                            <label htmlFor="" className="form-label">Last Name</label>
                            <input {...register('lastName')} id="lastName" type="text" className="form-control" />
                            {errors.lastName && <p className='text-danger'>{errors.lastName.message}</p>}
                        </div>
                    </div>
                    <label htmlFor="" className="form-label">Email</label>
                    <input {...register('email')} id="email" type="email" className="form-control" />
                    {errors.email && <p className='text-danger'>{errors.email.message}</p>}

                    <div className="row">
                        <div className="col password">
                            <label htmlFor="" className="form-label">Password</label>
                            <input {...register('password')} id="password" type="password" className="form-control" />
                            {errors.password && <p className='text-danger'>{errors.password.message}</p>}
                        </div>
                        <div className="col confirmPassword">
                            <label htmlFor="" className="form-label"> Confirm Password</label>
                            <input {...register('confirmPassword')} id="confirmPassword" type="password" className="form-control"/>
                            {errors.confirmPassword && <p className='text-danger'>{errors.confirmPassword.message}</p>}
                        </div>
                    </div>
                    <button className="btn btn-primary mt-5">Submit</button>
                        </div>
                </div>
            </form>
        </>
    );
};

export default Register;
