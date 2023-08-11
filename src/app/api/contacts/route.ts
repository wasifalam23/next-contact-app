import connect from '@/dbConfig/dbConfig';
import Contact from '@/models/contactModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export const GET = async () => {
  try {
    const contacts = await Contact.find();

    return NextResponse.json(
      {
        status: 'success',
        results: contacts.length,
        data: { contacts },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log('Error💥', err);
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { firstName, lastName, email, phone } = await req.json();

    const newContact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
    });

    return NextResponse.json(
      {
        status: 'success',
        data: { contact: newContact },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.log('Error💥', err);
    return NextResponse.json({ err }, { status: 500 });
  }
};
