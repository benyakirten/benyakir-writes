import * as React from "react";

import {
	ControlGroup,
	Form,
	LeadHeading,
	Page,
	Paragraph,
} from "@Styles/general-components";

import { AlertBox, Button, CustomLink, Loading } from "@Gen";
import { Text, TextArea } from "@Input";

import { EMAIL_REGEX } from "@Constants";
import { useValidation } from "@Hooks";
import { encode } from "@Utils/other";
import { validateByRegex, validateLength } from "@Utils/validation";

export const Head: React.FC = () => (
	<>
		<title>Benyakir Writes - Contact</title>
		<meta
			name="description"
			content="Write me a message and contact me, either to see if I can help you, about my writing or anything else."
		/>
	</>
);

const ContactPage: React.FC = () => {
	const [loading, setLoading] = React.useState<boolean>(false);
	const [email, setEmail, emailValid] = useValidation([
		validateByRegex(EMAIL_REGEX),
	]);
	const [message, setMessage, messageValid] = useValidation([
		validateLength({ min: 1 }),
	]);

	const [result, setResult] = React.useState("");
	const [success, setSuccess] = React.useState(false);

	const dismissResult = () => setResult("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!emailValid || !messageValid) return;
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
				setResult("Unable to process form. Please try again later.");
				setSuccess(false);
				return;
			}
			setResult("Message sent successfully!");
			setSuccess(true);
			setEmail("");
			setMessage("");
		} catch (e) {
			setResult("Unable to process form. Please try again later.");
			setSuccess(false);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Page>
			<LeadHeading>Contact</LeadHeading>
			<Paragraph>
				This form is a nice way to contact me. However, if it doesn't work, I
				urge you to either send me an email directly at{" "}
				<CustomLink outside to="mailto:ben@benyakiredits.com">
					ben@benyakiredits.com
				</CustomLink>{" "}
				or send me a message through the{" "}
				<CustomLink outside to="https://benyakiredits.com/about-me/contact">
					contact page on my old blog
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
						value={email.toString()}
						onChange={setEmail}
						autofocus
					/>
				</ControlGroup>
				<ControlGroup>
					<TextArea
						name="message"
						label="Message"
						value={message.toString()}
						onChange={setMessage}
					/>
				</ControlGroup>
				<Button type="submit" disabled={!emailValid || !messageValid}>
					{loading ? <Loading size="1.4rem" /> : "Submit"}
				</Button>
			</Form>
		</Page>
	);
};

export default ContactPage;
