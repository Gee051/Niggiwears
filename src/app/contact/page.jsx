import ContactForm from "../components/ContactForm";
import { BiSolidPhoneCall} from 'react-icons/bi';
import { BsWhatsapp } from 'react-icons/bs';

export default function Home() {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p>Please fill in the form below</p>

      <ContactForm />
      <div className=" md:text-xl lg:text-2xl text-center pt-4">
        <p className="flex flex-col-2 items-center gap-2 justify-center">
           OR CALL{" "}
            <BiSolidPhoneCall className="text-center items-center flex justify-end"/>
          <span className="font-bold hover:text-magenta">08160006700</span>
        </p>
        <p className="flex flex-col-2 items-center gap-2 justify-center pt-2">
           WHATSAPP{" "}
          <BsWhatsapp className="text-center items-center flex justify-end" />
          <span className="font-bold hover:text-magenta">
            +234 816 000 6700
          </span>
        </p>
      </div>
    </div>
  );
}
