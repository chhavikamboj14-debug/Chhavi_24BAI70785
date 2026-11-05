
package com.example.backend.service;

import com.example.backend.entity.ProcessedEvent;
import com.example.backend.entity.ScheduledPost;
import com.example.backend.repository.ProcessedEventRepository;
import com.example.backend.repository.ScheduledPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class KafkaConsumerService {

    @Autowired
    private ScheduledPostRepository postRepository;

    @Autowired
    private ProcessedEventRepository processedEventRepository;

    @KafkaListener(
            topics = "post-topic",
            groupId = "post-processing-group"
    )
    public void consumePostEvent(ScheduledPost post) {

        String eventId = String.valueOf(post.getId());

        // 1. Check whether the event was already processed
        if (processedEventRepository.existsById(eventId)) {
            System.out.println(
                    "Duplicate event detected. Skipping post ID: " + eventId
            );
            return;
        }

        // 2. Process the event
        System.out.println("Processing post ID: " + eventId);

        // Simulate a temporary failure to test automatic retries
        if (Math.random() < 0.2) {
            throw new RuntimeException("Simulated temporary processing failure");
        }

        post.setStatus("PUBLISHED");
        postRepository.save(post);

        // 3. Save the event ID to prevent duplicate processing
        ProcessedEvent processedEvent = new ProcessedEvent();
        processedEvent.setEventId(eventId);
        processedEvent.setProcessedAt(LocalDateTime.now());

        processedEventRepository.save(processedEvent);

        System.out.println(
                "Successfully published post ID: " + eventId
        );
    }
}
