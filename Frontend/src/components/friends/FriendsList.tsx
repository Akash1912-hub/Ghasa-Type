import React from 'react';
import { User } from '../../types';
import { UserPlus, UserMinus, Users } from 'lucide-react';

interface FriendsListProps {
  friends: User[];
  onAddFriend: (userId: string) => void;
  onRemoveFriend: (userId: string) => void;
  onChallenge: (userId: string) => void;
}

export const FriendsList: React.FC<FriendsListProps> = ({
  friends,
  onAddFriend,
  onRemoveFriend,
  onChallenge
}) => {
  return (
    <div className="p-4 bg-white/5 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-[#e2b714]" />
          <h3 className="text-lg font-medium text-white">Friends</h3>
        </div>
        <button
          onClick={() => {/* Open add friend modal */}}
          className="p-2 text-gray-400 hover:text-white"
        >
          <UserPlus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2">
        {friends.map(friend => (
          <div
            key={friend.id}
            className="flex items-center justify-between p-2 hover:bg-white/10 rounded-md"
          >
            <div>
              <div className="text-white">{friend.username}</div>
              <div className="text-sm text-gray-400">
                Best: {friend.bestWpm} WPM
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onChallenge(friend.id)}
                className="px-3 py-1 text-sm bg-[#e2b714] text-black rounded-md"
              >
                Challenge
              </button>
              <button
                onClick={() => onRemoveFriend(friend.id)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <UserMinus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};