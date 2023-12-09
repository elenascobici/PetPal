import React, {useState, useEffect, useRef, useCallback} from "react";
import MessageBox from "./MessageBox";
import InfiniteScroll from 'react-infinite-scroll-component';
import "./style.css";

const Messages = ({ appId }) => {
    const [messages, setMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [nextCursor, setNextCursor] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const userId = localStorage.getItem('id');
    const messageContainerRef = useRef(null);
  
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      fetchMessages(token);
    }, [userId]);
  
    const fetchMessages = (token) => {
      if (!hasMore) {
        setHasMore(false);
        return;
      }
  
      const url = nextCursor
        ? `http://localhost:8000/application/${appId}/messages?cursor=${nextCursor}`
        : `http://localhost:8000/application/${appId}/messages`;
  
      fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            console.log("ERROR:", response.status, response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log(data.results);
          console.log(data.next_cursor);
  
          // Store the current scroll position
          const container = messageContainerRef.current;
          const isAtBottom = container.scrollTop + container.clientHeight === container.scrollHeight;
  
          setNextCursor(data.next_cursor);
          setMessages([...data.results.reverse(), ...messages]);
  
          // Restore the scroll position
          if (isAtBottom) {
            container.scrollTop = container.scrollHeight;
          }
        })
        .catch(error => {
          console.log("Fetch error:", error);
        });
    };
  
    const handleScroll = () => {
      const container = messageContainerRef.current;
  
      if (container.scrollTop === 0 && nextCursor) {
        const token = localStorage.getItem('access_token');
        setScrollPosition(container.scrollHeight - container.scrollTop);
        fetchMessages(token);
      }
    };
  
    useEffect(() => {
      const container = messageContainerRef.current;
      if (container) {
        container.addEventListener('scroll', handleScroll);
        return () => {
          container.removeEventListener('scroll', handleScroll);
        };
      }
    }, [handleScroll]);
  
    useEffect(() => {
      // Scroll to the previous position when new messages are loaded
      if (messageContainerRef.current && nextCursor) {
        messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight - scrollPosition;
      }
    }, [messages.length, scrollPosition]);
  
    return (
      <div className="details-text">
        <div
          className="message-history"
          style={{ height: "500px", overflow: "auto" }}
          ref={messageContainerRef}
        >
          {messages.map((message, index) => (
            <MessageBox
              key={index}
              className={message.sender === Number(userId) ? "from" : "to"}
              content={message.content}
            />
          ))}
        </div>
        <div class="message-tb" id="message-tb-container">
                <textarea id="type-in" class="type-in" placeholder="Type your message here..."></textarea>
                <div class="row" id="overlay">
                  <div class="col-10 col-sm-11 col-md-11 col-lg-11 col-format"></div>
                  <div class="col-2 col-sm-1 col-md-1 col-lg-1 col-format">
                    <a href="my-application-msg.html#jump-here">
                      <img src="images/send-btn.png" class="send-btn-format"/>
                    </a>
                </div>
                </div>
              </div>
      </div>
    );
  };
  
  export default Messages;