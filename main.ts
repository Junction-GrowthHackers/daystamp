/**
 * Copyright (c) 2022 ZEP Co., LTD
 */

import 'zep-script';

ScriptApp.onSidebarTouched.Add(function(p) {
  if (p.role === 3000 || p.role === 3001) {
    p.tag.widget = p.showWidget('daystamp.html', 'sidebar', 480, 400);
  } else {
    p.tag.widget = p.showWidget('daystamp-user.html', 'sidebar', 480, 400);
  }

  p.tag.widget.sendMessage({
    userId: p.id,
    nickName: p.name,
    spaceHashId: ScriptApp.mapHashID,
  });

  p.tag.widget.onMessage.Add(function(player, data) {
    if (data.type == 'close') {
      player.tag.widget.destroy();
      player.tag.widget = null;
    }
    if (data.type == 'success') {
      player.showCenterLabel('출석 체크되었습니다.');
    } else if (data.type == 'noschedule') {
      player.showCenterLabel('출석 체크 가능한 시간이 아닙니다.');
    } else if (data.type == 'duplicate') {
      player.showCenterLabel('이미 출석 체크되었습니다.');
    } else if (data.type == 'nottoday') {
      player.showCenterLabel('출석은 당일만 가능합니다.');
    }
  });
});

// 플레이어가 입장 할 때 동작하는 함수
ScriptApp.onJoinPlayer.Add(function(p) {
  p.tag = {
    widget: null,
  };
});

// 플레이어가 퇴장 할 때 동작하는 함수
ScriptApp.onLeavePlayer.Add(function(p) {
  if (p.tag.widget) {
    p.tag.widget.destroy();
    p.tag.widget = null;
  }
});
