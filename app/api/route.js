import { ConnectDB } from '@/lib/config/db';
import TodoModel from '@/lib/models/TodoModel';
import { NextResponse } from 'next/server';

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export async function GET(request) {
  const todos = await TodoModel.find({});

  return NextResponse.json({
    todos,
  });
}

export async function POST(request) {
  const { title, description } = await request.json();

  await TodoModel.create({
    title,
    description,
  });

  return NextResponse.json({
    msg: 'Todo Created',
  });
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const mongoId = searchParams.get('mongoId');

  try {
    // 验证 mongoId 是否存在
    if (!mongoId) {
      return NextResponse.json({ msg: 'mongoId is required' }, { status: 400 });
    }

    // 使用 findByIdAndDelete 方法删除文档
    const result = await TodoModel.findByIdAndDelete(mongoId);

    // 如果没有找到对应的文档
    if (!result) {
      return NextResponse.json({ msg: 'Todo not found' }, { status: 404 });
    }

    return NextResponse.json({ msg: 'Todo DELETED' });
  } catch (err) {
    console.error('err: ', err);
    return NextResponse.json({ msg: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  const mongoId = await request.nextUrl.searchParams.get('mongoId');

  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: true,
    },
  });

  return NextResponse.json({
    msg: 'Todo Completed',
  });
}
