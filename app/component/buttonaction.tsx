
import Spinner from "./spinner";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ButtonActionProps {npm: any
  onClick: () => void;
  isLoading?: boolean;
}
 
export const DeleteButton: React.FC<
  ButtonActionProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, isLoading = false, ...props }) => {
  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={onClick}
      {...props}
      className="text-red-500  h-6 w-6 "
    >
      {isLoading ? <Spinner /> : <TrashIcon />}
    </button>
  );
};
 
export const EditButton: React.FC<
  ButtonActionProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ onClick, isLoading = false, ...props }) => {
  return (
    <button
      disabled={isLoading}
      type="button"
      onClick={onClick}
      {...props}
      className="text-blue-500 h-6 w-6"
    >
      {isLoading ? <Spinner /> : <PencilSquareIcon />}
    </button>
  );
};