import { twMerge } from "tailwind-merge";

export default function InputComponent({type = "text", name, placeholder = "Type Here", className, ...props }) {
    return <input type={type} placeholder={placeholder} name={name} id={name} className={twMerge("input rounded-lg input-bordered w-full max-w-xs px-10", className)} {...props} />
}