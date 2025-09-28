import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type RegisterErrors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    form?: string;
}

const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
};

export default function Register() {
    const [values, setValues] = useState<RegisterFormValues>({name: '', email: '', password: '', confirmPassword: ''})
    const [errors, setErrors] = useState<RegisterErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as HTMLInputElement  // name: "name" | "email" | "password" | "confirmPassword"
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const validate = () => {
        const next: RegisterErrors = {}
        const { name, email, password, confirmPassword } = values
        const regex = /^\S+@\S+\.\S+$/

        if (!name.trim()) next.name = 'Name is required.';

        if (!email) next.email = 'Email is required.';
        else if (!regex.test(email)) next.email = 'Invalid email format.';

        if (!password) next.password = 'Password is required.';
        else if (password.length < 6) next.password = 'Must be at least 6 characters.';

        if (!confirmPassword) next.confirmPassword = 'Confirm password is required.';
        else if (confirmPassword !== password) next.confirmPassword = 'Passwords do not match.';

        setErrors(next)
        return Object.keys(next).length === 0
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!validate()) {
            return
        }

        try {
            setIsSubmitting(true)
            // aqui ira la llamada a la api -> await api.post('/auth/register', values)
            await new Promise((res) => setTimeout(res, 700))
            navigate('/my-plants') // si es un exito, paso a login
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                email: 'Something went wrong. Please, try again.'
            }))
        } finally {
            setIsSubmitting(false)
        }
    }

    const { name, email, password, confirmPassword } = values
    const isDisabled = !name || !email || !password || !confirmPassword || isSubmitting

    return ( 
        <>
            <div className="container py-4" style={{ maxWidth: 480 }}>
                <h2 className="mb-3">Registro</h2>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className='mb-3'>
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input 
                            id="name" 
                            name="name" 
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                        />
                        <div className="invalid-feedback">{errors.name}</div>
                        {errors.name && <div id="name-error" className="invalid-feedback">{errors.name}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && <div id="email-error" className="invalid-feedback">{errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={password}
                        onChange={handleChange}
                        placeholder="••••••"
                        required
                        minLength={6}
                        aria-invalid={!!errors.password}
                        aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    {errors.password && <div id="password-error" className="invalid-feedback">{errors.password}</div>}
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        value={confirmPassword}
                        onChange={handleChange}
                        placeholder="Repite la contraseña"
                        required
                        aria-invalid={!!errors.confirmPassword}
                        aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                    />
                    {errors.confirmPassword && (
                        <div id="confirmPassword-error" className="invalid-feedback">
                        {errors.confirmPassword}
                        </div>
                    )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={isDisabled}>
                    {isSubmitting ? 'Loading...' : 'Create account'}
                    </button>

                </form>
            </div>
        </>
    )

}