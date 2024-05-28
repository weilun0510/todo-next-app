import mongoose from 'mongoose';

// 定义 Schema
const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// 检查是否已经存在 'todo' 模型，如果不存在则创建
const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema);

// 导出模型
export default TodoModel;
