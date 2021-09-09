import * as React from "react";
import { useLocation } from '@reach/router'

import { ControlGroup, Form, LeadHeading } from "@Styles/general-components";

import Text from "@Input/Text/Text.component";
import TextArea from "@Input/TextArea/TextArea.component";
import Button from "@Gen/Button/Button.component";
import Loading from "@/components/General/Loading/Loading.component";
import AlertBox from "@Gen/AlertBox/AlertBox.component";

const ContactPage: React.FC = () => {
    const location = useLocation()

    const [loading, setLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [result, setResult] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const dismissResult = () => setResult("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dismissResult()
        setLoading(true);
        const form = {
            email,
            message,
            "form-name": "Contact Form",
        };
        try {
            const res = await fetch(location.pathname, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                setResult("Unable to process form. Please try again later");
                setSuccess(false);
                return;
            }
            setResult("Message sent successfully!");
            setSuccess(true);
            setEmail("")
            setMessage("")
        } catch (e) {
            console.log(e)
            setResult("Unable to process form. Please try again later");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <LeadHeading>Contact</LeadHeading>

            <Form
                name="Contact Form"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
            >
                {result && (
                    <AlertBox success={success}>
                        {result}
                    </AlertBox>
                )}
                <input type="hidden" name="form-name" value="Contact Form" />
                <ControlGroup>
                    <Text
                        name="email"
                        label="Email"
                        value={email}
                        onChange={setEmail}
                    />
                </ControlGroup>
                <ControlGroup>
                    <TextArea
                        name="message"
                        label="Message"
                        value={message}
                        onChange={setMessage}
                    />
                </ControlGroup>
                <Button
                    type="submit"
                    disabled={
                        email.length === 0 || message.length === 0 || loading
                    }
                >
                    {loading ? <Loading size="1.4rem" /> : "Submit"}
                </Button>
            </Form>
        </>
    );
};

export default ContactPage;
