import { redirect, LinksFunction, ActionFunction, ActionFunctionArgs } from "@remix-run/node";

import AuthForm from 'app/components/AuthForm';
import { links as buttonLinks } from 'app/components/Button';

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
	const formData: FormData = await request.formData();
	const username: FormDataEntryValue | null = formData.get("username");
	const password: FormDataEntryValue | null = formData.get("password");

	if (username === "test" && password === "test") {
		return redirect("/app");
	}
	return { success: false, error: "Invalid credentials" };
};

const LoginPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="transform translate-y-[-20%]">
				<AuthForm/>
			</div>
		</div>
	)
}

export default LoginPage;

export const links: LinksFunction = () => {
	return [...buttonLinks()];
}