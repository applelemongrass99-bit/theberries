import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import type { NewBookData } from "../types";

interface NewBookDialogProps {
	open: boolean;
	onAdd: (book: NewBookData) => void;
	onClose: () => void;
}

// pages is a string here because <input> values are always strings
interface FormState {
	title: string;
	author: string;
	pages: string;
	read: boolean;
}

const emptyForm: FormState = { title: "", author: "", pages: "", read: false };

export default function NewBookDialog({ open, onAdd, onClose }: NewBookDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [form, setForm] = useState<FormState>(emptyForm);

	// Sync the native <dialog> with the `open` prop
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		const { name, value, type, checked } = event.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	}

	function handleSubmit(event: SubmitEvent<HTMLFormElement>): void {
	event.preventDefault();
	onAdd({ ...form, pages: Number(form.pages) });
	setForm(emptyForm);
}

	function handleCancel(): void {
		setForm(emptyForm);
		onClose();
	}

	return (
		// onClose also fires when the user presses Escape
		<dialog id="new-book-dialog" ref={dialogRef} onClose={handleCancel}>
			<form id="new-book-form" onSubmit={handleSubmit}>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					id="title"
					name="title"
					value={form.title}
					onChange={handleChange}
					required
				/>

				<label htmlFor="author">Author</label>
				<input
					type="text"
					id="author"
					name="author"
					value={form.author}
					onChange={handleChange}
					required
				/>

				<label htmlFor="pages">Pages</label>
				<input
					type="number"
					id="pages"
					name="pages"
					value={form.pages}
					onChange={handleChange}
					required
				/>

				<label htmlFor="read">Read the book?</label>
				<input
					type="checkbox"
					id="read"
					name="read"
					checked={form.read}
					onChange={handleChange}
				/>

				<button type="submit">Add New Book</button>
				<button type="button" id="cancel-book-dialog-btn" onClick={handleCancel}>
					Cancel
				</button>
			</form>
		</dialog>
	);
}
