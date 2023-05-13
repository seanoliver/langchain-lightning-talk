'use client';

import { useState } from 'react';

export default function Home() {
	const [formData, setFormData] = useState({task: ''});
	const [isThinking, setIsThinking] = useState(false);
	const [tasks, setTasks] = useState([]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsThinking(true);
		const resp = await fetch('/api/task-splitter', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const taskResponse = await resp.json();

		setTasks(taskResponse.response.split('\n'));
		setIsThinking(false);
	}

	return (
		<>
			<div className='Home flex h-screen items-center justify-center flex-col'>
				<p className='Home-title text-center text-4xl'>Task Splitter</p>
				<p className='Home-subtitle text-center text-2x1 py-3'>
					Small steps to big goals!
				</p>
				<form onSubmit={handleSubmit}>
					<input
						className='border border-slate-300 p-5 text-center w-96 mt-3'
						type='text'
						value={formData.task}
						onChange={e => setFormData({ task: e.target.value })}
						placeholder='Enter your big task here'
					/>
				</form>
				{isThinking && (
					<p className='p-3 font-bold animate-bounce'>Thinking...</p>
				)}
				{tasks.length > 0 && (
					<div className='flex flex-col mt-5 items-center justify-center'>
						<p className='text-2xl font-bold mt-10'>Your action plan:</p>
						<ol className='list-decimal mt-5'>
							{tasks.map((task, index) => (
								<li
									key={index}
									className='list-item'>
									{task}
								</li>
							))}
						</ol>
					</div>
				)}
			</div>
		</>
	);
}
