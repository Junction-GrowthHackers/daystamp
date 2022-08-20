/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import "zep-script";

ScriptApp.onSidebarTouched.Add(function(p) {
  if (p.role === 3000 || p.role === 3001) {
    p.tag.widtget = p.showWidget('daystamp.html', 'sidebar', 480, 400);
  } else {
    p.tag.widtget = p.showWidget('daystamp-user.html', 'sidebar', 480, 400);
  }

  p.tag.widget.onMessage.Add(function (player, data) {
    if (data.type == "close") {
      player.showCenterLabel("위젯이 닫혔습니다.");
      player.tag.widget.destroy();
      player.tag.widget = null;
    }
  });
})

// 플레이어가 입장 할 때 동작하는 함수
ScriptApp.onJoinPlayer.Add(function (p) {
  p.tag = {
    widget: null,
  };
});

// 플레이어가 퇴장 할 때 동작하는 함수
ScriptApp.onLeavePlayer.Add(function (p) {
  if (p.tag.widget) {
    p.tag.widget.destroy();
    p.tag.widget = null;
  }
});
