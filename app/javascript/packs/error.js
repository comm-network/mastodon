import ready from '../mastodon/ready';

ready(() => {
  const soul = {
    'up': [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚',
    ],
    'down': [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣',
    ],
    'mid': [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉',
    ],
  };

  let all = [].concat(soul.up, soul.down, soul.mid);

  let zalgo = {};

  function randomNumber(range) {
    return Math.floor(Math.random() * range);
  }

  function is_char(character) {
    let bool = false;
    all.filter(function (i) {
      bool = (i === character);
    });
    return bool;
  }

  zalgo.heComes = function (text, options) {
    let result = '';

    options = options || {};
    options.up = options.up || true;
    options.mid = options.mid || true;
    options.down = options.down || true;
    options.size = options.size || 'maxi';
    let counts;
    text = text.split('');
    for (let l in text) {
      // noinspection JSUnfilteredForInLoop
      if (is_char(l)) {
        continue;
      }
      // noinspection JSUnfilteredForInLoop
      result = result + text[l];

      counts = { 'up': 0, 'down': 0, 'mid': 0 };

      switch (options.size) {
        case 'mini':
          counts.up = randomNumber(8);
          counts.min = randomNumber(2);
          counts.down = randomNumber(8);
          break;
        case 'maxi':
          counts.up = randomNumber(16) + 3;
          counts.min = randomNumber(4) + 1;
          counts.down = randomNumber(64) + 3;
          break;
        default:
          counts.up = randomNumber(8) + 1;
          counts.mid = randomNumber(6) / 2;
          counts.down = randomNumber(8) + 1;
          break;
      }

      let arr = ['up', 'mid', 'down'];
      for (let d in arr) {
        let index = arr[d];
        for (let i = 0; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  };

  document.getElementById('message').innerHTML = zalgo.heComes(document.getElementById('message').innerText, { size: 'mini' });
});
