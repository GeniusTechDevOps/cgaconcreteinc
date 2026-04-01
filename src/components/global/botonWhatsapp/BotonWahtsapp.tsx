import  { Fragment, useState } from "react";
import classes from "./btnwhatsapp.module.css";

interface BotonWhatsappProps {
  data: any;
}

function BotonWhatsapp({ data }: BotonWhatsappProps) {
  const [active, setActive] = useState(false);
  const [sendInput, setSendInput] = useState("");

  const sendWhatsapp = () => {
    const relmsg = sendInput.replace(/ /g, "%20");
    const phone = data.dataGeneral.phones[0].number
      .replace("-", "")
      .replace("-", "");

    window.open(`https://wa.me/1${phone}?text=` + relmsg, "_blank");
    setSendInput("");
    setActive(false);
  };

  return (
    <Fragment>
      <div className={classes.nav_bottom}>
        <div
          className={`${classes.popup_whatsapp} ${classes.fadeIn} ${
            active ? classes.is_active_whatsapp_popup : ""
          }`}
        >
          <div className={`${classes.content_whatsapp_header} ${classes._top}`}>
            <div className={`${classes.self_content}`}>
              <div className={`${classes.online}`}></div>
              <img
                src={data.logos.favicon}
                width={80}
                height={80}
                alt="logo"
                className={`${classes.before_img}`}
              />

              <div className="flex flex-col">
                <span className="text-white text_name_company">
                  {data.name}
                </span>
                <span className={`${classes.text_typically}`}>
                  Typically replies in minutes
                </span>
              </div>
              <div className={classes.contentClose}>
                <button
                  type="button"
                  className={`${classes.closePopup} bg-black `}
                  onClick={() => setActive(!active)}
                  name="send_btn"
                  aria-label="Send message"
                >
                  X
                </button>
              </div>
            </div>
          </div>
          <div className={`${classes.chat_box_body}`}>
            {/* <div className={`${classes.loader}`}>
              <span></span>
              <span></span>
              <span></span>
            </div> */}
            <div className={`${classes.chat_box_message}`}>
              <span className={`${classes.text_name_body}`}>{data.name}</span>{" "}
              <br />
              <span className="text-black">
                Hi there 👋<br></br>
                How can we help you?
              </span>
            </div>
          </div>
          <div className={`${classes.content_whatsapp} ${classes._bottom}`}>
            <input
              className={classes.whats_input}
              type="text"
              placeholder="Send Message..."
              value={sendInput}
              onChange={(e) => setSendInput(e.target.value)}
            />

            <button
              className={classes.send_msPopup}
              id="send_btn"
              type="button"
              onClick={() => sendWhatsapp()}
              name="send_btn"
              aria-label="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                width={20}
              >
                <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
              </svg>
            </button>
          </div>
        </div>
        <button
          type="button"
          id="whats_openPopup"
          className={`${classes.whatsapp_button}`}
          onClick={() => setActive(!active)}
          name="send_btn"
          aria-label="Send message"
        >
          <div className={classes.float}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
              fill="currentColor"
              className="inline-block w-8 h-8 stroke-current m-auto "
            >
              <style>svg</style>
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
            </svg>
          </div>
        </button>
        <div className={classes.circle_anime}></div>
      </div>
    </Fragment>
  );
}

export default BotonWhatsapp;
