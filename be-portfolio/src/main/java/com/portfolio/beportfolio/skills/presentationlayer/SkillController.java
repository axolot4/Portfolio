package com.portfolio.beportfolio.skills.presentationlayer;

import com.portfolio.beportfolio.skills.businesslayer.SkillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/skills")
@Slf4j
@CrossOrigin(origins = "*")
public class SkillController {
    private SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponseModel>> getAllSkills() {
        return ResponseEntity.ok().body(skillService.getAllSkills());
    }

    @GetMapping("/{skillId}")
    public ResponseEntity<SkillResponseModel> getSkillBySkillId(@PathVariable String skillId) {
        SkillResponseModel skill = skillService.getSkillBySkillId(skillId);
        return ResponseEntity.ok(skill);
    }

    @PostMapping
    public ResponseEntity<SkillResponseModel> addSkill(@RequestBody SkillRequestModel skillRequestModel) {
        return ResponseEntity.status(HttpStatus.CREATED).body(skillService.addSkill(skillRequestModel));
    }

    @PutMapping("/{skillId}")
    public ResponseEntity<SkillResponseModel> updateSkill(@PathVariable String skillId,@RequestBody SkillRequestModel skillRequestModel) {
        return ResponseEntity.ok(skillService.updateSkill(skillId, skillRequestModel));
    }

    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> deleteSkill(@PathVariable String skillId) {
        skillService.deleteSkill(skillId);
        return ResponseEntity.noContent().build();
    }
}
