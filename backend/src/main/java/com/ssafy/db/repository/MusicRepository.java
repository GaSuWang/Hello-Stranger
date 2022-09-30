package com.ssafy.db.repository;

import com.ssafy.db.entity.Music;
import com.ssafy.db.mapping.FoodCategoryMapping;
import com.ssafy.db.mapping.MusicMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MusicRepository extends JpaRepository<Music, Integer> {

    @Query(value = "select * from music order by RAND() limit 5", nativeQuery = true)
    List<MusicMapping> getCategoryList();
}
