
{
  //タスクの通し番号を定義
  let taskId = 0;
  //ラジオボタンで「全て」をクリックした場合
  document.querySelector('input[value="all"]').addEventListener('click',() => {
    //全てのtrからhideクラスを削除
    Array.from(document.querySelectorAll('tr'), tr => {
      tr.classList.remove('hide');
    });
  });
  //ラジオボタンで「作業中」をクリックした場合
  document.querySelector('input[value="working"]').addEventListener('click',() => {
    //全てのtrからhideクラスを削除
    Array.from(document.querySelectorAll('tr'), tr => {
      tr.classList.remove('hide');
    });
    //「完了」を除外
    Array.from(document.querySelectorAll('tr.complete'), tr => {
      tr.classList.add('hide');
    });
  });
  //ラジオボタンで「完了」をクリックした場合
  document.querySelector('input[value="complete"]').addEventListener('click',() => {
    //全てのtrからhideクラスを削除
    Array.from(document.querySelectorAll('tr'), tr => {
      tr.classList.remove('hide');
    });
    //「作業中」を除外
    Array.from(document.querySelectorAll('tr.working'), tr => {
      tr.classList.add('hide');
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
      //タスク部分のhtml作成
      const task_html = `<tr class="working" data-task-id = "${taskId}" ><td>${taskId}</td><td>${taskStr}</td><td><button class="working-status-button">作業中</button><button class="delete-button">削除</button></td></tr>`;
      //htmlを埋め込む
      document.querySelector('table').insertAdjacentHTML('beforeend',task_html);
      //作業中ボタンのクリック時のイベント設定
      document.querySelector(`tr[data-task-id='${taskId}'] >td:nth-child(3) >button:nth-child(1)`).addEventListener('click',function(e){
        //ボタンのテキストを完了に変更
        e.target.textContent = '完了';
        //親の親要素からworkingクラスを削除
        e.target.parentElement.parentElement.classList.remove('working');
        //親の親要素にcompleteクラスを追加
        e.target.parentElement.parentElement.classList.add('complete');
      });
      //削除ボタンのクリック時のイベント設定
      document.querySelector(`tr[data-task-id='${taskId}'] >td:nth-child(3) >button:nth-child(2)`).addEventListener('click',function(e){
        //ボタンの親の親要素を削除
        e.target.parentElement.parentElement.remove();
      });
    }
  });
}
