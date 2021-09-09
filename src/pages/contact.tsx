import * as React from "react";
import { Helmet } from "react-helmet";

import {
    ControlGroup,
    Form,
    LeadHeading,
    Paragraph,
} from "@Styles/general-components";

import Text from "@Input/Text/Text.component";
import TextArea from "@Input/TextArea/TextArea.component";

import Button from "@Gen/Button/Button.component";
import Loading from "@Gen/Loading/Loading.component";
import AlertBox from "@Gen/AlertBox/AlertBox.component";
import CustomLink from "@Gen/CustomLink/CustomLink.component";

import { EMAIL_REGEX } from "@Constants";

const ContactPage: React.FC = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [result, setResult] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const [disabled, setDisabled] = React.useState(true);

    const dismissResult = () => setResult("");

    React.useEffect(() => {
        if (EMAIL_REGEX.test(email) && message.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [email, message]);

    function encode(data: object) {
        return Object.keys(data)
            .map(
                (key) =>
                    `${encodeURIComponent(key)}=${encodeURIComponent(
                        data[key as keyof typeof data]
                    )}`
            )
            .join("&");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (disabled) return;
        dismissResult();
        setLoading(true);
        try {
            const res = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encode({
                    email,
                    message,
                    "form-name": "Contact Form",
                }),
            });
            if (!res.ok) {
                setResult("Unable to process form. Please try again later");
                setSuccess(false);
                return;
            }
            setResult("Message sent successfully!");
            setSuccess(true);
            setEmail("");
            setMessage("");
        } catch (e) {
            setResult("Unable to process form. Please try again later");
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Helmet>
                <title>Benyakir Writes - Contact</title>
                <meta
                    name="description"
                    content="Write me a message and contact me, either for work I can perform, about my writing or anything else."
                />
            </Helmet>
            <LeadHeading>Contact</LeadHeading>
            <Paragraph>
                This form should work, and it's a nice way to contact me. That
                said, if it doesn't work, I urge you to either send me an email
                directly at{" "}
                <CustomLink outside to="mailto:ben@benyakiredits.com">
                    ben@benyakiredits.com
                </CustomLink>{" "}
                or send me a message through the&nbsp;
                <CustomLink
                    outside
                    to="https://benyakiredits.com/about-me/contact"
                >
                    contact screen on my old blog
                </CustomLink>
                .
            </Paragraph>
            <Form
                name="Contact Form"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
            >
                {result && <AlertBox success={success}>{result}</AlertBox>}
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
                <Button type="submit" disabled={disabled}>
                    {loading ? <Loading size="1.4rem" /> : "Submit"}
                </Button>
            </Form>
        </>
    );
};

export default ContactPage;
