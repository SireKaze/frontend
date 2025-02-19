import clsx from "clsx";

interface InputProps {
    isError?: boolean;
    messageError?: string;
}

function InputText({
    isError = false,
    messageError = "wajib disi",
    ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <section>
            <input {...props}  className={clsx(`w-full border rounded px-2`, {
          "border-red-500 border-2": isError,  
          "border-gray-700": !isError,
        })} />

            {isError && <p className="text-red-500">{messageError}</p>}
        </section>
    );
}

export default InputText;
