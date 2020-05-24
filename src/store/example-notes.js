import { createNote } from ".";

export default [
    createNote('Create this app', [
        { title: 'Create home page', done: false },
        { title: 'Create note page', done: true },
        { title: 'Create todo component', done: true },
    ]),
    createNote('Test note 1', [
        { title: 'Task 1', done: false },
        { title: 'Task 2', done: true },
        { title: 'Task 3', done: false },
        { title: 'Task 5', done: false },
        { title: 'Task 6', done: true },
        { title: 'Task 7', done: false },
    ]),
];
