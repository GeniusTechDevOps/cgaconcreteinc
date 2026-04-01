import type { RootObject } from "../../interfaces/dbData";
interface FormProps {
  data: RootObject;
}

const Form: React.FC<FormProps> = ({ data }: FormProps) => {
    // Asegúrate de que 'data.dataGeneral.emails' esté definido
  const emailAddresses = data.dataGeneral.emails
    ? data.dataGeneral.emails.map((email) => email.email).join(",") // Unir todos los correos electrónicos
    : "";
  return (
    <div className="">
      {/* @ts-ignore */}
      <form-contact
        to={emailAddresses}
        services={
          // anidarlos con un join
          data.services.map((service) => service.title).join(",")
        }
        server="https://email-server-r-8fb46242f2ca.herokuapp.com/email/genius"
        img={data.logos.primary}
        emailcolor="1"
        isenglish="true"
      >
        {/* @ts-ignore */}
      </form-contact>
    </div>
  );
};

export default Form;
