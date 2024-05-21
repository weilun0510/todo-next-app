const {
    default: mongoose
} = require('mongoose')

const Schema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
})

// 因为不能重复定义model，所以用 或 的这种解决办法
const TodoModel = mongoose.model.todo || mongoose.model('todo', Schema)

export default TodoModel