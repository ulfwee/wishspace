import React from 'react';
import './FriendRequestCard.css';

const FriendRequestCard = ({
  request,
  onAccept,
  onReject
}) => {

  return (
    <div className="request-card">

      <div className="request-info">

        <div className="request-avatar">
          {request.senderId?.charAt(0)}
        </div>

        <div className="request-details">

          <h4>
            {request.senderUsername || request.senderId}
          </h4>

          <span className="username">
            @{request.senderUsername || 'user'}
          </span>

          <span className="mutual">
            👥 Friend request
          </span>

        </div>

      </div>

      <div className="request-actions">

        <button
          className="btn-accept"
          onClick={() => onAccept(request.uid)}
        >
          ✓ Accept
        </button>

        <button
          className="btn-decline"
          onClick={() => onReject(request.uid)}
        >
          ✕ Decline
        </button>

      </div>

    </div>
  );
};

export default FriendRequestCard;