'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Todo from '/Components/Todo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios('/api');

    setTodoData(response.data.todos);
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prevFromData) => ({ ...prevFromData, [name]: value }));
    console.log(formData);
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    try {
      // api code
      const response = await axios.post('/api', formData);
      toast.success(response.data.msg);
      setFormData({
        title: '',
        description: '',
      });
      fetchTodos();
    } catch (err) {
      toast.error('Error');
      console.log('err: ', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('/api', { params: { mongoId: id } });

      toast.success(response.data.msg);
      fetchTodos();
    } catch (err) {
      toast.error('Error');
      console.log('err: ', err);
    }
  };

  const completeToto = async (id) => {
    const response = await axios.put(
      '/api',
      {},
      {
        params: {
          mongoId: id,
        },
      },
    );
    toast.success(response.data.msg);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandle}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter Description"
          className="px-3 py-2 border-2 w-full"
        />
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map(
              ({ title, description, isCompleted, _id: id }, index) => (
                <Todo
                  key={index}
                  id={index}
                  title={title}
                  description={description}
                  complete={isCompleted}
                  mongoId={id}
                  deleteTodo={deleteTodo}
                  completeToto={completeToto}
                />
              ),
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
