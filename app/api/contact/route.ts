import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
	const key = process.env.RESEND_API_KEY;
	if (!key) {
		return NextResponse.json(
			{ error: "Email is not configured" },
			{ status: 503 }
		);
	}

	let body: { name?: string; email?: string; message?: string };
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "Invalid request" }, { status: 400 });
	}

	const name = body.name?.trim();
	const email = body.email?.trim();
	const message = body.message?.trim();

	if (!name || !email || !message) {
		return NextResponse.json({ error: "Missing fields" }, { status: 400 });
	}

	const to = process.env.CONTACT_TO ?? "abhiraman21696@gmail.com";
	const from = process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>";

	try {
		const resend = new Resend(key);
		const { error } = await resend.emails.send({
			from,
			to,
			replyTo: email,
			subject: `Portfolio · New message from ${name}`,
			text: `From: ${name} <${email}>\n\n${message}`,
		});

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 502 });
		}
		return NextResponse.json({ ok: true });
	} catch {
		return NextResponse.json({ error: "Failed to send" }, { status: 502 });
	}
}
