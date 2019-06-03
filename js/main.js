
{
  //タスクの通し番号を定義
  let taskId = 0;
  //リストの表示を変える関数
  const taskFilter = status => {
    Array.from(document.querySelectorAll('tr'), tr => {
      tr.classList.remove('hide');
    });
    if (status === 'working'){
      Array.from(document.querySelectorAll('tr.complete'), tr => {
        tr.classList.add('hide');
      });
    }else if (status === 'complete'){
      Array.from(document.querySelectorAll('tr.working'), tr => {
        tr.classList.add('hide');
      });
    }
  }
  //ラジオボタンをクリックした場合にstatusの中身を取得してリスト表示を変える関数を実行
  Array.from(document.querySelectorAll('input[name="status"]'), input => {
    input.addEventListener('click', e => {
      taskFilter(e.target.value);
    });
  });
  //タスクを追加する機能
  document.getElementById('submit').addEventListener('click',() => {
    //フォームからタスクの中身を取得
    const taskStr = document.getElementById('task').value;
    //フォームの中身チェック
    if (taskStr !== ''){
      //フォームの中身を初期化
      document.getElementById('task').value = '';
      //タスクIDの変更
      taskId += 1;
      //タスク部分のDOM作成
      const task = document.createElement('tr');
      const taskIdArea = document.createElement('td');
      taskIdArea.textContent = taskId;
      const taskTextArea = document.createElement('td');
      taskTextArea.textContent = taskStr;
      const buttonArea = document.createElement('td');
      //作業の状態を表すボタンを作成して初期化
      const statusButton = document.createElement('button');
      statusButton.textContent = '作業中';
      task.classList.add("working");
      //ボタンを押した際にタスクの状態を入れ替える
      statusButton.addEventListener('click', () => {
        task.classList.toggle('working');
        task.classList.toggle('complete');
        if (statusButton.textContent === '作業中'){
          statusButton.textContent = '完了';
        }else{
          statusButton.textContent = '作業中';
        }
      });
      //削除ボタンの作成
      const deleteButton = document.createElement('button');
      deleteButton.textContent ='削除';
      deleteButton.addEventListener('click', () => {
        task.remove();
      });
      buttonArea.appendChild(statusButton);
      buttonArea.appendChild(deleteButton);
      task.appendChild(taskIdArea);
      task.appendChild(taskTextArea);
      task.appendChild(buttonArea);
      document.querySelector('table').appendChild(task);
    }
  });
}
