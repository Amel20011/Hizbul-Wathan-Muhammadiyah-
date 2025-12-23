
import { MenuSection, FileNode } from './types';

export const BOT_INFO = {
  name: 'AestheticBot',
  owner: '@owner',
  prefix: '.',
  mode: 'Public',
  version: '2.0.4'
};

export const MENU_DATA: MenuSection[] = [
  {
    title: 'MAIN MENU',
    icon: '🌸',
    color: 'pink',
    commands: [
      { name: '.menu' },
      { name: '.help' },
      { name: '.ping' },
      { name: '.runtime' },
      { name: '.info' }
    ]
  },
  {
    title: 'AI MENU',
    icon: '🧠',
    color: 'purple',
    commands: [
      { name: '.ai', usage: '<text>' },
      { name: '.chatgpt', usage: '<text>' },
      { name: '.ask', usage: '<question>' },
      { name: '.imagine', usage: '<prompt>' }
    ]
  },
  {
    title: 'TOOLS MENU',
    icon: '🛠',
    color: 'blue',
    commands: [
      { name: '.translate' },
      { name: '.shortlink' },
      { name: '.qc' },
      { name: '.toimg' },
      { name: '.tomp3' }
    ]
  },
  {
    title: 'DOWNLOADER',
    icon: '🎧',
    color: 'emerald',
    commands: [
      { name: '.ytmp3', usage: '<link>' },
      { name: '.ytmp4', usage: '<link>' },
      { name: '.tiktok', usage: '<link>' },
      { name: '.instagram', usage: '<link>' },
      { name: '.facebook', usage: '<link>' }
    ]
  },
  {
    title: 'FUN MENU',
    icon: '🎨',
    color: 'orange',
    commands: [
      { name: '.sticker' },
      { name: '.smeme' },
      { name: '.meme' },
      { name: '.quote' },
      { name: '.confess' }
    ]
  },
  {
    title: 'GROUP MENU',
    icon: '👥',
    color: 'indigo',
    commands: [
      { name: '.add' },
      { name: '.kick' },
      { name: '.promote' },
      { name: '.demote' },
      { name: '.tagall' },
      { name: '.hidetag' }
    ]
  },
  {
    title: 'OWNER MENU',
    icon: '👑',
    color: 'rose',
    commands: [
      { name: '.ban' },
      { name: '.unban' },
      { name: '.bc' },
      { name: '.setppbot' },
      { name: '.restart' }
    ]
  }
];

export const PROJECT_STRUCTURE: FileNode = {
  name: 'bot-wa',
  type: 'folder',
  children: [
    { name: 'index.js', type: 'file' },
    { name: 'config.js', type: 'file' },
    { name: 'package.json', type: 'file' },
    {
      name: 'database',
      type: 'folder',
      children: [
        { name: 'users.json', type: 'file' },
        { name: 'chats.json', type: 'file' },
        { name: 'settings.json', type: 'file' }
      ]
    },
    {
      name: 'handlers',
      type: 'folder',
      children: [
        { name: 'message.js', type: 'file' },
        { name: 'command.js', type: 'file' },
        { name: 'group.js', type: 'file' }
      ]
    },
    {
      name: 'commands',
      type: 'folder',
      children: [
        {
          name: 'main',
          type: 'folder',
          children: [
            { name: 'menu.js', type: 'file' },
            { name: 'help.js', type: 'file' },
            { name: 'owner.js', type: 'file' }
          ]
        },
        {
          name: 'ai',
          type: 'folder',
          children: [
            { name: 'chatgpt.js', type: 'file' },
            { name: 'image.js', type: 'file' }
          ]
        }
      ]
    },
    {
      name: 'lib',
      type: 'folder',
      children: [
        { name: 'functions.js', type: 'file' },
        { name: 'fetcher.js', type: 'file' },
        { name: 'converter.js', type: 'file' }
      ]
    },
    {
      name: 'media',
      type: 'folder',
      children: [
        { name: 'thumbnail.jpg', type: 'file' },
        { name: 'logo.png', type: 'file' }
      ]
    }
  ]
};
