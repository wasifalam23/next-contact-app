import connect from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import Contact from '@/models/contactModel';

connect();

interface contact {
  params: { id: string };
}

export const GET = async (_req: any, context: contact) => {
  try {
    const contactId = context.params.id;
    const contact = await Contact.findById(contactId);

    return NextResponse.json(
      { status: 'success', data: { contact } },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ status: 'fail', error: err }, { status: 404 });
  }
};

export const PATCH = async (req: NextRequest, context: contact) => {
  try {
    const { firstName, lastName, email, phone } = await req.json();

    const contactId = context.params.id;

    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        firstName,
        lastName,
        email,
        phone,
      },
      { runValidators: true, new: true }
    );

    return NextResponse.json(
      {
        status: 'success',
        data: { contact: updatedContact },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ status: 'fail', error: err }, { status: 404 });
  }
};

export const DELETE = async (_req: any, context: contact) => {
  try {
    const contactId = context.params.id;

    const contact = await Contact.findByIdAndDelete(contactId);

    if (!contact)
      return NextResponse.json({
        status: 'error',
        message: 'No contact found with that ID',
      });

    return NextResponse.json(
      { status: 'success', data: null },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(err);

    return NextResponse.json(
      {
        status: 'fail',
        error: err,
      },
      { status: 404 }
    );
  }
};
