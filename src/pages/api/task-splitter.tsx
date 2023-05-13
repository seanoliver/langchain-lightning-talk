import { ChatOpenAI } from 'langchain/chat_models/openai';
import { HumanChatMessage, SystemChatMessage } from 'langchain/schema';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function TaskSplitter(
	req: NextApiRequest,
	res: NextApiResponse
): Promise<void> {
	const { task } = req.body;

	const openAI = new ChatOpenAI({
		temperature: 0.2,
		openAIApiKey: process.env.OPENAI_API_KEY,
		modelName: 'gpt-3.5-turbo',
	});

	const response = await openAI.call([
		new SystemChatMessage(`
            You are acting as a tool that helps people break down tasks into smaller tasks.
            A human will provide a task, and you will return a list of smaller tasks that will help the human complete the task.
            Please separate each task with a new line.
            Please do not provide any additional information.
            `),
		new HumanChatMessage(
			`Please break this task down into a list of smaller tasks: ${task}`
		),
	]);

	return res.status(200).json({ response: response.text });
}
