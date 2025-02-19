interface LabelProps {
    htmlFor: string;
    isRequired?: boolean;
    title: string;
  }
  
  const Label: React.FC<LabelProps> = ({ htmlFor, isRequired, title }) => (
    <label htmlFor={htmlFor}>
      {title} {isRequired && '*'}
    </label>
  );
 
  
  export default Label;
  